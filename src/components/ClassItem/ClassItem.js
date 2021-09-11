import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './ClassItem.css';

class ClassItem extends Component {

    render() { 
        return (
            <div className="classItem-field">
                <h2 className="classItem-title">{this.props.name}</h2>
                <p className="classItem-info">{this.props.descriptions}</p>
                <p className="classItem-info">Возраст: {this.props.min_age} - {this.props.max_age}</p>
                <div className="classItem-button">Подробнее</div>
            </div>
        );
    }
}

export default ClassItem;