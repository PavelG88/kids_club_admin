import React, { Component } from 'react';


import './ListGroup.css';

class ListGroup extends Component {

    state = {
        isConfirm: false,
        list_groups_id: null, 
        sheduleItem: null,
        kid_surname: null, 
        kid_name: null
    }

    confirmationDeletion = (list_groups_id, sheduleItem, kid_surname, kid_name) => {
        this.setState({
            isConfirm: true, 
            list_groups_id: list_groups_id, 
            sheduleItem: sheduleItem,
            kid_surname: kid_surname,
            kid_name: kid_name
        });
    }

    clickDelet = () => {
        this.props.delete(this.state.list_groups_id, this.state.sheduleItem)
        this.setState({
            isConfirm: false, 
            list_groups_id: null, 
            sheduleItem: null,
            kid_surname: null,
            kid_name: null
        });
    }
    
    clickCancel = () => {
        this.setState({
            isConfirm: false, 
            list_groups_id: null, 
            sheduleItem: null,
            kid_surname: null,
            kid_name: null
        });
    } 

    render() { 
        if (!this.props.isShow) {
            return null;
        }
        // console.log(this.props);
        return (
            <div className="list-group-field">
                <h2 className="list-group-title">{this.props.name_class}</h2>
                <p className="list-group-info">Группа: {this.props.name_group}</p>
                <p className="list-group-info">Руководитель: {this.props.teacher}</p>
                {this.props.min_age_group === this.props.max_age_group
                ?
                    <p className="list-group-info">Возраст: {this.props.min_age_group}</p>
                :
                    <p className="list-group-info">Возраст: {this.props.min_age_group} - {this.props.max_age_group}</p>
                }
                <p className="list-group-info margin-top-5">Всего мест: {this.props.max_number}</p>
                <h2 className="list-group-title">Список детей</h2>
                <ul className="list-group-info margin-0">
                    {this.props.current_number > 0
                    ?
                        this.props.children.map((kid) => {
                            return (
                                <li className="list-group-info margin-top-5 list" key={kid.kid_id}>
                                    <div className="list-group__list-item">
                                        <div className="list-group__kid">{kid.kid_surname} {kid.kid_name}</div>
                                        <div className="list-group__button-delete" onClick={() => {this.confirmationDeletion(kid.list_groups_id, this.props.sheduleItem, kid.kid_surname, kid.kid_name)}}>X</div>
                                    </div>
                                </li>
                            );
                        })
                    :
                        <li className="list-group-info margin-0">---</li>
                    }
                </ul>
                
                <div 
                    className="list-group-button" 
                    onClick={this.props.action}
                >
                    Закрыть
                </div>

                <div className={this.state.isConfirm ? "confirm visible" : "confirm unvisible"}>
                    <div className="confirm_wrapper">
                        <p className="confirm_text">Вы уверены, что хотите удалить</p> 
                        <p className="confirm_text-name">{this.state.kid_surname} {this.state.kid_name}</p>
                        <div className="confirm__buttons">
                            <button className="confirm__button" onClick = {this.clickDelet}>Удалить</button>
                            <button className="confirm__button" onClick = {this.clickCancel}>Отменить</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default ListGroup;