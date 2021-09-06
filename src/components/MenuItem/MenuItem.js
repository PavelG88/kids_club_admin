import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './MenuItem.css';

class MenuItem extends Component {

    // state = {
       
    // }

    render() { 
        return (
            <>
                <Link className="menu-field__item" to="{this.props.link}">
                    {this.props.name}
                </Link>
            </>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         user: state.user
//     };
// };

export default connect(null)(MenuItem);