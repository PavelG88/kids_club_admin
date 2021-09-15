import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './GroupItem.css';

class GroupItem extends Component {

    render() { 
        return (
            <div className="groupItem-field">
                <h3 className="groupItem-title">{this.props.name_group}</h3>
                <p className="groupItem-info">Руководитель: {this.props.teacher}</p>
                {this.props.min_age_group === this.props.max_age_group
                ?
                    <p className="moreDetails-info">Возраст: {this.props.min_age_group}</p>
                :
                <p className="groupItem-info">Возраст: {this.props.min_age_group} - {this.props.max_age_group}</p>
                }
                <p className="groupItem-info">Всего мест: {this.props.max_number}</p>
                <p className="groupItem-info margin-top-5">Свободно: {this.props.max_number - this.props.current_number}</p>
                <h4 className="groupItem-title">Расписание</h4>
                <ul className="groupItem-info margin-0">
                    {this.props.shedule.map((sedule_item) => {
                        return (
                            <li className="groupItem-info list margin-0">{sedule_item.day}: {sedule_item.time_start} - {sedule_item.time_end}</li>
                        );
                    }
                    )}
                </ul>

                <Link 
                    className="groupItem-button"
                    to="/recording"
                >
                    Записать в группу
                </Link>
            </div>
        );
    }
}

export default GroupItem;