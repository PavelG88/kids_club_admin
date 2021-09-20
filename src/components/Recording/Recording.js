import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import './Recording.css';
import InputArea from '../InputArea/InputArea';

let dateFormat = require("dateformat");

class Recording extends Component {

   state = {
      isLoading: true,
      classes: null,
      isClassesSelected: false,
      groupsClass: null,
      // fieldsWithError: ['classes', 'kid_name', 'kid_surname', 'birthday', 'parent_name', 'parent_surname', 'parent_phone'],
      fieldsWithError: [],
      isChildInBD: false,
      childrenList: null,
      userInput: {
         classes_id: '',
         group: {},
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
         }, 
         user_id: this.props.user_id
      },
      isSave: false
   }

   getListOfClassesFromBD = () => {
      axios.get(`http://localhost:3001/listClasses/`)
      .then(res => {
         this.setState({ isLoading: false, classes: res.data });
      })
      .catch(err => {
         console.log(err);
         this.setState({ isLoading: false });
      });
   }

   getGroupsNameFromBD = (id) => {
      this.setState({ isLoading: true }, () => {
         axios.get(`http://localhost:3001/ListGroups/${id}`)
         .then(res => {
            this.setState({ isLoading: false, groupsClass: res.data });
         })
         .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
         });
      });
      
   }

   getListClassesAndGroupsFromBD(listId) {
      const {classes_id, group_id} = listId;
      axios.get(`http://localhost:3001/listClassesAndGroups/${classes_id}`)
      .then(res => {
         let updateUserInput = this.state.userInput;
         updateUserInput.classes_id = classes_id;

         let freePlaces, min_age, max_age;
         res.data[1].forEach((group) => {
            if (group.group_id === group_id) {
               freePlaces = group.max_number - group.current_number;
               min_age = group.min_age_group;
               max_age = group.max_age_group;
               // console.log(freePlaces);
            }
         });
         
         updateUserInput.group.groups_class_id = group_id;
         updateUserInput.group.min_age = min_age;
         updateUserInput.group.max_age = max_age;
         updateUserInput.group.freePlaces = freePlaces;
         this.setState({ isLoading: false, classes: res.data[0], groupsClass: res.data[1], isClassesSelected: true, userInput: updateUserInput});
      })
      .catch(err => {
         console.log(err);
         this.setState({ isLoading: false });
      });   
}

   getChildrenListFromBD = () => {
      this.setState({ isLoading: true }, () => {
         axios.get(`http://localhost:3001/ListChildrens`)
         .then(res => {
            this.setState({ isLoading: false, childrenList: res.data, isChildInBD: !this.state.isChildInBD });
         })
         .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
         });
      });
      
   }

   userSelect = (event) => {
      if (event.target.name === 'classes'){
         //Выбран кружок
         let updateUserInput = this.state.userInput;
         updateUserInput.classes_id = event.target.value
         //Удаляем поле из ошибок
         const newFielsWithError = this.state.fieldsWithError.filter((item) => {
            return item !== event.target.name;
         });

         this.setState({ userInput: updateUserInput, isClassesSelected: true, fieldsWithError: [...newFielsWithError] });
         //Запрашиваем из БД список групп для выбранноего кружка
         this.getGroupsNameFromBD(event.target.value);
      
      } else if (event.target.name === 'groups_class'){
         //Выбрана группа
         console.log(this.state.groupsClass);

         // Определяем количество свободных мест, минимальный и максимальный возраст группы
         let freePlaces, min_age, max_age;
         this.state.groupsClass.forEach((group) => {
            if (group.group_id === event.target.value) {
               freePlaces = group.max_number - group.current_number;
               min_age = group.min_age_group;
               max_age = group.max_age_group;
               // console.log(freePlaces);
            }
         });

         let updateUserInput = this.state.userInput;
         updateUserInput.group.groups_class_id = event.target.value;
         updateUserInput.group.min_age = min_age;
         updateUserInput.group.max_age = max_age;
         updateUserInput.group.freePlaces = freePlaces;
         
         if (freePlaces > 0) {
            const newFielsWithError = this.state.fieldsWithError.filter((item) => {
               return item !== event.target.name;
            });
            this.setState({ userInput: updateUserInput, fieldsWithError: [...newFielsWithError] });
         }

         this.setState({ userInput: updateUserInput });
      
      } else if (event.target.name === 'child-in-BD'){
         
         if(!this.state.isChildInBD) {
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
      } else if (event.target.name === 'select-child'){
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
      
      // //Проверка возраста ребенка и возраста группы
      // if (name === 'birthday' && !this.state.userInput.groups_class_id) {
      //    value = this.checkAge(value)
      // }

      let updateUserInput = this.state.userInput;
      updateUserInput.children[name] = value;

      if (!value) {
         //Проверяем есть ли поле уже в полях с ошибкой
         let isFieldInFieldsWithError = this.state.fieldsWithError.find((item) => {
             return item === name;
         });

         if (!isFieldInFieldsWithError) {
             const newFielsWithError = [...this.state.fieldsWithError, name];
             this.setState({ userInput: updateUserInput, fieldsWithError: newFielsWithError });
         } else {
             this.setState({ userInput: updateUserInput });
         }

     } else {
         //Удаляем поле из ошибок
         const newFielsWithError = this.state.fieldsWithError.filter((item) => {
             return item !== name;
         });

         //Вносим изменения в локальный State
         this.setState({ userInput: updateUserInput, fieldsWithError: [...newFielsWithError] });
     }      
   }

   recordInBD = (event) => {
      event.preventDefault(); 
      this.setState({ isLoading: true });
      axios.post(`http://localhost:3001/Recording`, this.state.userInput)
         .then(res => {
            // console.log(res.data);
            this.setState({ isLoading: false, isSave: true });
         })
         .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
         });
   }

   render() { 

      if (!this.props.location.state && !this.state.classes) {
         this.getListOfClassesFromBD();
      } 
      
      if (this.props.location.state && !this.state.classes) {
         this.getListClassesAndGroupsFromBD(this.props.location.state);
      }
      
      if (this.state.isLoading) {
         return (
               <div className="preloader">
                  Загрузка из БД
               </div>
         );
      }
      

      // if (this.state.isSaved && !this.state.loading) {
      //       return <Redirect to='/shedule'/>
      // }

      
      // console.log(this.state.fieldsWithError);
      return (
         <>
               <form className="recording-field" onSubmit={this.recordInBD}>
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
                              <select onChange={this.userSelect} name="groups_class" value={this.state.userInput.group.groups_class_id} className="recording-field__select">
                                 <option value="" hidden>Выберите группу</option>
                                 {this.state.groupsClass.map((groupItem, index) => {
                                       return <option 
                                          value={groupItem.group_id} 
                                          key={groupItem.group_id}
                                          index={index}
                                          >
                                             {groupItem.name_group} (Возразст: {groupItem.min_age_group === groupItem.max_age_group ? `${groupItem.min_age_group} ` : `${groupItem.min_age_group} - ${groupItem.max_age_group}`} Свободно мест: {groupItem.max_number - groupItem.current_number})
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
                                          {child.kid_surname + ' ' + child.kid_name + ' (' + dateFormat(child.birthday, "dd.mm.yyyy") + ')'}
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

                     <button disabled={this.state.fieldsWithError.length}>Записать</button>

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