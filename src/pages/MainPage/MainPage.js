import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
// import {  } from '../../components/actions/actions';

import './MainPage.css';
import Header from '../../components/header/Header';
import Main from '../../components/Main/Main';
import ListClasses from '../../components/ListClasses/ListClasses';
import Recording from '../../components/Recording/Recording';
import Shedule from '../../components/Shedule/Shedule';

class MainPage extends Component {

    // state = {
       
    // }

    render() { 
        return (
            <div className="main-paige__wrapper">
                <Header />
                <div className="info-field">
                    <Route path="/" exact component={Main}/>
                    <Route path="/listClasses" exact component={ListClasses}/>
                    <Route path="/recording" exact component={Recording}/>
                    <Route path="/shedule" exact component={Shedule}/>
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