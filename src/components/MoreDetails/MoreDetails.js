import React, { Component } from 'react';


import './MoreDetails.css';
import GroupItem from '../GroupItem/GroupItem';

class MoreDetails extends Component {

    render() { 
        if (!this.props.isShow) {
            return null;
        }

        return (
            <div className="moreDetails-field">
                <h2 className="moreDetails-title">{this.props.name_class}</h2>
                <p className="moreDetails-info">{this.props.description}</p>
                <p className="moreDetails-info">Возраст: {this.props.min_age} - {this.props.max_age}</p>
                <div className="moreDetails-group">
                    {this.props.groups ? this.props.groups.map((group_item) => {
                        return <GroupItem {...group_item} key={group_item.group_id}/>
                    })
                    :
                    'Список групп отсутствует'
                    }
                </div>
                <div 
                    className="moreDetails-button" 
                    onClick={this.props.action}
                >
                    Закрыть
                </div>
            </div>
        );
    }
}

export default MoreDetails;