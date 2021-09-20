import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import './Shedule.css';
import SheduleItem from '../../components/SheduleItem/SheduleItem';
import ListGroup from '../ListGroup/ListGroup';
import Preloader from '../Preloader/Preloader';

class Shedule extends Component {

    state = {
       isLoading: true,
       daysOfWeek: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'],
       shedule: null,
       isShowList: false,
       listChildren: null,
       error: ''
    }

    getSheduleFromBD = () => {
        axios.get(`http://localhost:3001/shedule/`)
        .then(res => {
            this.setState({ isLoading: false, shedule: res.data });
        })
        .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }

    getListChildrenFromBD = (id) => {
        axios.get(`http://localhost:3001/listChildrens/${id}`)
        .then(res => {
            let updateListChildren = this.state.listChildren;
            updateListChildren.children = res.data;
            this.setState({ isLoading: false, listChildren: updateListChildren });
        })
        .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }

    deleteChildrenFromGroup = (list_groups_id, sheduleItem)  => {    
        this.setState({ isLoading: true} );
        axios.delete(`http://localhost:3001/listChildrens/${list_groups_id}`)
        .then(res => {
            if (res.data) {
                let updateListChildren = this.state.listChildren;
                updateListChildren.children = this.state.listChildren.children.filter((kid) => {
                    return kid.list_groups_id !== list_groups_id;
                });
                let updateShedule = this.state.shedule;
                let [day, index] = sheduleItem;
                updateShedule[day][index].current_number--;

                this.setState({ isLoading: false, listChildren: updateListChildren, shedule: updateShedule });
            }
        })
        .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }

    showList = (groupInfo) => {
        this.setState({ isShowList: true, isLoading: true, listChildren: groupInfo} );
        this.getListChildrenFromBD(groupInfo.group_id);
    }

    closeList = () => {
        this.setState({ isShowList: false, listChildren: null });
    }

    render() { 
        if (!this.state.shedule) {
            this.getSheduleFromBD();
        }

        if (this.state.isLoading) {
            return <Preloader />
        }

        return (
            <div className="shedule-field">
                
                {this.state.daysOfWeek.map((day, index) => {
                    return (
                        <div className="shedule-item" key={index}>
                            <h2 className="shedule-item__title">{day}</h2>
                            {this.state.shedule[day]
                            ?
                            this.state.shedule[day].map((item, indexInListOfDay) => {
                                return <SheduleItem {...item} key={item.shedule_id} action={this.showList} sheduleItem={[day, indexInListOfDay]}/>
                            })
                            :
                            <></>
                            }
                        </div>
                    )
                })}
                
                <div className={this.state.isShowList ? "shedule-item__visible" : "unvisible"}>
                    <ListGroup {...this.state.listChildren} isShow={this.state.isShowList} action={this.closeList} delete={this.deleteChildrenFromGroup} />
                </div>
            </div>
        );      
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(Shedule);