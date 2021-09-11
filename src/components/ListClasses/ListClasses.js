import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import './ListClasses.css';
import ClassItem from '../../components/ClassItem/ClassItem';

class ListClasses extends Component {

    state = {
       isLoading: true,
       classes: null,
       error: ''
    }

    getInfoFromBD = () => {
        // this.setState({ isLoading: true });
        axios.get(`http://localhost:3001/ListClasses/`)
        .then(res => {
            // console.log(res.data);
            this.setState({ isLoading: false, classes: res.data });
        })
        .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }

    render() { 
        if (!this.state.classes) {
            this.getInfoFromBD();
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
                    return <ClassItem key={classItem.id} {...classItem}/>
                })}
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