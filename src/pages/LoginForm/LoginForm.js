import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import { connect } from 'react-redux';

import './LoginForm.css';

class LoginForm extends Component {

    render() { 
        return (
            <div className="login-page">
                <div className="login-page__wrapper">
                    <div className="form">
                        <form className="login-form">
                            <input className="login-form__input" type="text" placeholder="username"/>
                            <input className="login-form__input" type="password" placeholder="password"/>
                            <button className="login-form__button">Авторизоваться</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         isLoading: state.isLoading
//     }
// }

// const mapDispatchToProps = dispatch => ({
//     onLoadTargets: () => dispatch(loadTargetsFromBD())

// });

export default connect(null)(LoginForm);