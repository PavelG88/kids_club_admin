import { startedConnecting, failureConnecting, successLogIn, successLogOut } from './types';
import axios from "axios";

export const logIn = (login, password) => {
    return dispatch => {
        dispatch(startLoading());
    
        axios.get(`http://localhost:3001/?login=${login}&password=${password}`)
            .then(res => {
                // console.log(res.data[0]);
                dispatch(logInSuccess(res.data[0]));
            })
            .catch(err => {
                dispatch(loadingFailure(err.message));
            });
        };
};

export const logOut = () => {
    return dispatch => {
        dispatch(logOutSuccess());
        };
};

const startLoading = () => ({
    type: startedConnecting
  });
  
const loadingFailure = error => ({
    type: failureConnecting,
    payload: {
        error
    }
});

const logInSuccess = data => ({
    type: successLogIn,
    payload: {
        data
    }
});

export const logOutSuccess = () => ({
    type: successLogOut
});