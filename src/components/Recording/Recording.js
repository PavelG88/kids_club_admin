import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import './Recording.css';
import InputArea from '../InputArea/InputArea';

class Recording extends Component {

   state = {
      isLoading: true,
      classes: null,
      isClassesSelected: false,
      groups_class: null,
      error: '',
      isChildInBD: false,
      childrenList: null,
      userInput: {
         classes_id: '',
         groups_class_id: '',
         children: {
               kid_id: null,
               kid_name: '',
               kid_surname: '',
               kid_second_name: '',
               birthday: '',
               parent_name: '',
               parent_surname: '',
               parent_second_name: '',
               parent_phone: ''
         }
      }
   }

   getListOfClassesFromBD = () => {
      axios.get(`http://localhost:3001/ListClasses/`)
      .then(res => {
         this.setState({ isLoading: false, classes: res.data });
      })
      .catch(err => {
         console.log(err);
         this.setState({ isLoading: false });
      });
   }

   getGroupsNameFromBD = (id) => {
      this.setState({ isLoading: true });
      axios.get(`http://localhost:3001/ListGroups/${id}`)
      .then(res => {
         // console.log(res.data);
         this.setState({ isLoading: false, groupsClass: res.data });
      })
      .catch(err => {
         console.log(err);
         this.setState({ isLoading: false });
      });
   }

   getChildrenListFromBD = () => {
      this.setState({ isLoading: true });
      axios.get(`http://localhost:3001/ListChildrens`)
      .then(res => {
         this.setState({ isLoading: false, childrenList: res.data });
      })
      .catch(err => {
         console.log(err);
         this.setState({ isLoading: false });
      });
   }

   userSelect = (event) => {
      if (event.target.name === 'classes'){
         let updateUserInput = this.state.userInput;
         updateUserInput.classes_id =event.target.value
         this.setState({ userInput: updateUserInput, isClassesSelected: true });
         this.getGroupsNameFromBD(event.target.value);
      }

      if (event.target.name === 'groups_class'){
         let updateUserInput = this.state.userInput;
         updateUserInput.groups_class_id = event.target.value;
         this.setState({ userInput: updateUserInput });
      }

      if (event.target.name === 'child-in-BD'){
         
         if(!this.state.isChildInBD) {
            this.setState({ isChildInBD: !this.state.isChildInBD });
            this.getChildrenListFromBD();
         } else {
            let updateUserInput = this.state.userInput;
            updateUserInput.children = {
               kid_id: null,
               kid_name: '',
               kid_surname: '',
               kid_second_name: '',
               birthday: '',
               parent_name: '',
               parent_surname: '',
               parent_second_name: '',
               parent_phone: ''
            }
            this.setState({ isChildInBD: !this.state.isChildInBD, childrenList: null, userInput: updateUserInput });
         }
      }

      if (event.target.name === 'select-child'){
         let selectedKid;
         for (let i = 0; i < this.state.childrenList.length; i++ ) {
               if (this.state.childrenList[i].kid_id === +event.target.value) {
                  selectedKid = this.state.childrenList[i];
                  break;
               }
         }
         let updateUserInput = this.state.userInput;
         updateUserInput.children = selectedKid;
         this.setState({ userInput: updateUserInput });

      }
   }

   changeState = (name, value) => {
      let updateUserInput = this.state.userInput;
      updateUserInput.children[name] = value;
      this.setState({ userInput: updateUserInput });
   }

   render() { 
      if (!this.state.classes) {
         this.getListOfClassesFromBD();
      }

      if (this.state.isLoading) {
         return (
               <div className="preloader">
                  Загрузка из БД
               </div>
         );
      }

      return (
         <>
               <form className="recording-field">
                  <div className="input-field">
                     <label>
                           Кружок:
                           <select onChange={this.userSelect} name="classes" value={this.state.userInput.classes_id} className="recording-field__select">
                              <option value='' hidden>Выберите кружок</option>
                              {this.state.classes.map((classItem) => {
                                 return <option 
                                       value={classItem.class_id} 
                                       key={classItem.class_id}
                                       >
                                          {classItem.name_class}
                                       </option>
                              })}
                           </select>
                     </label>

                     <label>
                           Группа:            
                           {!this.state.isClassesSelected
                           ?
                              <select name="groups_class" className="recording-field__select">
                                 <option value="" hidden>Сначала нужно выбрать кружок</option>
                              </select>
                           :
                              <select onChange={this.userSelect} name="groups_class" value={this.state.userInput.groups_class_id} className="recording-field__select">
                                 <option value="" hidden>Выберите группу</option>
                                 {this.state.groupsClass.map((groupItem) => {
                                       return <option 
                                          value={groupItem.group_id} 
                                          key={groupItem.group_id}
                                          >
                                             {groupItem.name_group}
                                          </option>
                                 })}
                              </select>
                           }
                     </label>

                     <label>
                           <input type="checkbox" name="child-in-BD" onChange={this.userSelect} checked={this.state.isChildInBD}/>
                           Уже есть в Базе
                     </label>
                     
                     {this.state.isChildInBD
                     ?
                           <select onChange={this.userSelect} name="select-child" className="recording-field__select">
                              <option value='' hidden>Выберите ребенка</option>
                              {this.state.childrenList.map((child) => {
                                 return <option 
                                       value={child.kid_id} 
                                       key={child.kid_id}
                                       >
                                          {child.kid_surname + ' ' + child.kid_name + ' (' + child.birthday + ')'}
                                       </option>
                              })}
                           </select>
                     :
                           <p>Введите информацию о ребенке</p>     
                     }
                  
                     <InputArea 
                           id='kid_name'
                           label='Имя ребенка:'
                           name='kid_name'
                           type='text'
                           action={this.changeState}
                           value={this.state.userInput.children.kid_name}
                           disabled={this.state.userInput.children.kid_id}
                     />
                     <InputArea 
                           id='kid_surname'
                           label='Фамилия ребенка:'
                           name='kid_surname'
                           type='text'
                           action={this.changeState}
                           value={this.state.userInput.children.kid_surname}
                           disabled={this.state.userInput.children.kid_id}
                     />
                     <InputArea 
                           id='kid_second_name'
                           label='Отчетсво ребенка (при наличии):'
                           name='kid_second_name'
                           type='text'
                           action={this.changeState}
                           value={this.state.userInput.children.kid_second_name}
                           disabled={this.state.userInput.children.kid_id}
                     />
                     <InputArea 
                           id='birthday'
                           label='Дата рождения:'
                           name='birthday'
                           type='date'
                           action={this.changeState}
                           value={this.state.userInput.children.birthday}
                           disabled={this.state.userInput.children.kid_id}
                     />
                     <InputArea 
                           id='parent_name'
                           label='Имя родителя:'
                           name='parent_name'
                           type='text'
                           action={this.changeState}
                           value={this.state.userInput.children.parent_name}
                           disabled={this.state.userInput.children.kid_id}
                     />
                     <InputArea 
                           id='parent_surname'
                           label='Фамилия родителя:'
                           name='parent_surname'
                           type='text'
                           action={this.changeState}
                           value={this.state.userInput.children.parent_surname}
                           disabled={this.state.userInput.children.kid_id}
                     />
                     <InputArea 
                           id='parent_second_name'
                           label='Отчество родителя (при наличии):'
                           name='parent_second_name'
                           type='text'
                           action={this.changeState}
                           value={this.state.userInput.children.parent_second_name}
                           disabled={this.state.userInput.children.kid_id}
                     />
                     <InputArea 
                           id='parent_phone'
                           label='Телефон для связи:'
                           name='parent_phone'
                           type='text'
                           action={this.changeState}
                           value={this.state.userInput.children.parent_phone}
                           disabled={this.state.userInput.children.kid_id}
                     />

                     <button>Записать</button>

                  </div>
               </form>
         </>
      );      
   }
}

const mapStateToProps = (state) => {
   return {
      user_id: state.user.user_id
   };
};

export default connect(mapStateToProps)(Recording);