import React, { Component } from 'react';
import { connect } from 'react-redux';

import './Main.css';
import Clock from '../Clock/Clock'

class Main extends Component {

    // state = {
       
    // }

   render() { 
      return (
         <>
            <div className="main-field">
               <Clock />
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

export default connect(mapStateToProps)(Main);