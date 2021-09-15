import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import './Recording.css';

class Recording extends Component {

    state = {
       isLoading: true,
       classes: null,
       isClassesSelected: false,
       groups_class: null,
       error: '',
       isChildInBD: false,
       childrenList: null,
       userInput: {classes_id: ''}
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
            this.setState({ userInput: {classes_id: event.target.value}, isClassesSelected: true });
            this.getGroupsNameFromBD(event.target.value);
        }

        if (event.target.name === 'groups_class'){
            let updateUserInput = this.state.userInput;
            updateUserInput.groups_class_id = event.target.value;
            this.setState({ userInput: updateUserInput });
        }

        if (event.target.name === 'child-in-BD'){
            this.setState({ isChildInBD: !this.state.isChildInBD });
            this.getChildrenListFromBD();
        }

        if (event.target.name === 'select-child'){
            
        }
    }

    render() { 
        console.log(this.state);
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
                    <select onChange={this.userSelect} name="classes" value={this.state.userInput.classes_id} className="recording-field__select">
                        <option value='' hidden>Выберите кружок</option>
                        {this.state.classes.map((classItem, index) => {
                            return <option 
                                value={classItem.class_id} 
                                key={classItem.class_id}
                                >
                                    {classItem.name_class}
                                </option>
                        })}
                    </select>

                    {!this.state.isClassesSelected
                    ?
                        <select onChange={this.userSelect} name="groups_class" className="recording-field__select">
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
                                    value={child.children_list_id} 
                                    key={child.children_list_id}
                                    >
                                        {child.kid_surname + ' ' + child.kid_name + ' (' + child.birthday + ')'}
                                    </option>
                            })}
                        </select>
                    :
                        <div>Введение информации о ребенке</div>   
                    }

                    <button>Записать</button>
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