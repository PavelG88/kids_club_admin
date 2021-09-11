import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from "axios";

import './ListClasses.css';
import ClassItem from '../../components/ClassItem/ClassItem';

class ListClasses extends Component {

    state = {
       isLoading: true,
       classes: [],
       error: ''
    }

    getInfoFromBD = () => {
        this.setState({ isLoading: true });
        axios.get(`http://localhost:3001/ListClasses/`)
        .then(res => {
            console.log(res.data);
            this.setState({ isLoading: false });
        })
        .catch(err => {
            console.log(err);
            this.setState({ isLoading: false });
        });
    }

    render() { 
        return (
            <>
            <div className="listClass-field">
                <ClassItem />
            </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
};

export default connect(mapStateToProps)(ListClasses);