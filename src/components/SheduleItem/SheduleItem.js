import React, { Component } from 'react';


import './SheduleItem.css';

class SheduleItem extends Component {

    render() {
        let groupInfo = {
            sheduleItem: this.props.sheduleItem,
            group_id: this.props.group_id, 
            name_class: this.props.name_class, 
            name_group: this.props.name_group, 
            teacher: this.props.teacher, 
            min_age_group: this.props.min_age_group, 
            max_age_group: this.props.max_age_group, 
            max_number: this.props.max_number, 
            current_number: this.props.current_number 
        }
        return (
            <div className="sheduleItem-field">
                <h3 className="sheduleItem-title">Время: {this.props.time_start} - {this.props.time_end}</h3>
                <p className="sheduleItem-info">{this.props.name_class} ({this.props.name_group})</p>
                {this.props.min_age_group === this.props.max_age_group
                ?
                    <p className="sheduleItem-info">Возраст: {this.props.min_age_group}</p>
                :
                    <p className="sheduleItem-info">Возраст: {this.props.min_age_group} - {this.props.max_age_group}</p>
                }
                <p className="sheduleItem-info margin-top-5">Всего мест: {this.props.max_number}</p>
                <p className="sheduleItem-info margin-top-5">Свободно: {this.props.max_number - this.props.current_number}</p>
                <button className="sheduleItem-button" onClick={() => {this.props.action(groupInfo)}}> Список </button >
            </div>
        );
    }
}

export default SheduleItem;