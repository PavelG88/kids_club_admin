import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import './ListClasses.css';
import ClassItem from '../../components/ClassItem/ClassItem';
import MoreDetails from '../MoreDetails/MoreDetails';

class ListClasses extends Component {

    state = {
       isLoading: true,
       classes: null,
       moreDetails: false,
       moreInfo: null,
       error: ''
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

    getMoreInfoFromBD = (id) => {
        this.setState({ isLoading: true, moreDetails: true });
        axios.get(`http://localhost:3001/ListClasses/${id}`)
        .then(res => {
            // console.log(res.data);
            this.setState({ isLoading: false, moreInfo: res.data });
        })
        .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }

    showMoreInfo = (id) => {
        this.setState({ moreDetails: true, isLoading: true });
        this.getMoreInfoFromBD(id);
    }

    closeMoreInfo = () => {
        this.setState({ moreDetails: false, moreInfo: null });
    }

    render() { 
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
            <div className="listClass-field">
                {this.state.classes.map((classItem) => {
                    return <ClassItem 
                        key={classItem.class_id} 
                        {...classItem} 
                        action = {this.showMoreInfo}
                    />
                })}
                <div className={this.state.moreDetails ? "visible" : "unvisible"}>
                    <MoreDetails {...this.state.moreInfo} isShow={this.state.moreDetails} action={this.closeMoreInfo} />
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

export default connect(mapStateToProps)(ListClasses);