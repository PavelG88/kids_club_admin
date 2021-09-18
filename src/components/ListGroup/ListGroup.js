import React, { Component } from 'react';


import './ListGroup.css';

class ListGroup extends Component {

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
                                        <div className="list-group__button-delete" onClick={() => {this.props.delete(kid.list_groups_id, this.props.sheduleItem)}}>X</div>
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
            </div>
        );
    }
}

export default ListGroup;