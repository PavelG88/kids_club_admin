import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import {  } from '../../components/actions/actions';

import './MainPage.css';
import Header from '../../components/header/Header';
import Main from '../../components/Main/Main';
import ListClasses from '../../components/ListClasses/ListClasses';

class MainPage extends Component {

    // state = {
       
    // }

    render() { 
        return (
            <div className="wrapper">
                <Header />
                <div className="info-ifeld">
                    <Route path="/" exact component={Main}/>
                    <Route path="/listClasses" exact component={ListClasses}/>
                </div>
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