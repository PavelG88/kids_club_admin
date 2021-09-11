import React, { Component } from 'react';

import './ClassItem.css';

class ClassItem extends Component {

    render() { 
        return (
            <div className="classItem-field">
                <h2 className="classItem-title">{this.props.name_class}</h2>
                <p className="classItem-info">{this.props.descriptions}</p>
                <p className="classItem-info">Возраст: {this.props.min_age} - {this.props.max_age}</p>
                <div 
                    className="classItem-button" 
                    onClick={() => this.props.action(this.props.class_id)}
                >
                    Подробнее
                </div>
            </div>
        );
    }
}

export default ClassItem;