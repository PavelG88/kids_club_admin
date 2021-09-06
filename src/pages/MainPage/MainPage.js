import React, { Component } from 'react';
import { connect } from 'react-redux';
// import {  } from '../../components/actions/actions';

import './MainPage.css';
import Header from '../../components/header/Header';

class MainPage extends Component {

    // state = {
       
    // }

    render() { 
        return (
            <div className="wrapper">
                <Header />
                <h1>ПОЛЕ С ИЗМЕНЯЕМЫМ КОНТЕНТОМ</h1>
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