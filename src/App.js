import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import LoginForm from './pages/LoginForm/LoginForm';
import MainPage from './pages/MainPage/MainPage';

class App extends React.Component {
   render() {
      // console.log(this.props.user.length);
      if(this.props.user.user_id && !this.props.isLoading){
         return (
            <div className="wrapper">
               <MainPage />
            </div>
         );
      } else {
         return (
            <div className="wrapper">
               <LoginForm />
            </div>
         );
      }
   }
}

const mapStateToProps = (state) => {
   return {
       user: state.user,
       isLoading: state.loading
   };
};

export default connect(mapStateToProps)(App);
