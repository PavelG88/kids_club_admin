import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import {  } from '../../components/actions/actions';

import './MainPage.css';
import Header from '../../components/header/Header';
import Main from '../../components/Main/Main';

class MainPage extends Component {

    // state = {
       
    // }

    render() { 
        return (
            <div className="wrapper">
                <Header />
                <Route path="/" exact component={Main}/>
            </div>
        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//         error: state.error
//     };
// };

// const mapDispatchToProps = dispatch => ({
    
// });

// export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
export default connect(null)(MainPage);