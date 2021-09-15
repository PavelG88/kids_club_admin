import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Header.css';
import { logOut } from '../../components/actions/actions';
import MenuItem from '../MenuItem/MenuItem';

class Header extends Component {

    // state = {
       
    // }

    render() { 
        return (
            <>
                <div className="user-field">
                    <h2 className="user-field__title">Добрый день, {this.props.user.user_name} {this.props.user.user_surname}!</h2>
                    <div className="user-field__button" onClick={this.props.logOut}>Выход</div>
                </div>
                <div className="menu-field">
                    <MenuItem name="Главная" link="/"/>
                    <MenuItem name="Список кружков" link="/listClasses"/>
                    <MenuItem name="Запись на кружок" link="/recording"/>
                    <MenuItem name="Добавление кружка" link="/"/>
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

const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut())
});


export default connect(mapStateToProps,mapDispatchToProps)(Header);