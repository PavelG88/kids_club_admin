import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logIn } from '../../components/actions/actions';

import './LoginForm.css';

class LoginForm extends Component {

    state = {
        isFilledIn: true
    }
    
    handeSubmit = (event) => {
        event.preventDefault();
        let data = new FormData(event.target);
        let login = data.get('login');
        let password = data.get('password');

        if (!login & !password) {
            this.setState({isFilledIn: false});
        } else {
            this.setState({isFilledIn: true});
        }

        console.log(login, password);

        this.props.logIn(login, password);

    }

    render() { 
        return (
            <div className="login-page">
                <div className="login-page__wrapper">
                    <div className="form">
                        <form className="login-form" onSubmit={this.handeSubmit}>
                            <input name="login" className="login-form__input" type="text" placeholder="username"/>
                            <input name="password" className="login-form__input" type="password" placeholder="password"/>
                            <button className="login-form__button">Авторизоваться</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.loading
    };
};

const mapDispatchToProps = dispatch => ({
    logIn: (login, password) => dispatch(logIn(login, password))
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);