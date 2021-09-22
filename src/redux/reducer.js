import { startedConnecting, failureConnecting, successLogIn, successLogOut } from '../components/actions/types';

let initialState = {
   user: {
         
   },
   loading: false,
   error: null
};

/**
 * state = initialState - установка значения по умолчанию. Когда ничего не пердается
 */

function reducer(state = initialState, action) {
    if (action.type === successLogIn) {
        //Удачная авторизация
        let updateState = {...state};
        updateState.user = action.payload.data;
        updateState.loading = false;
      //   console.log(updateState);
        return updateState;

    } else if (action.type === startedConnecting) {
        //Флаг получения данных из БД
        let updateState = {...state};
        updateState.loading = true;
        return updateState;

    } else if (action.type === failureConnecting) {
        //Ошибка загрузки данных из БД
        let updateState = {...state};
        updateState.loading = false;
        updateState.error = action.payload;
        return updateState;

    } else if (action.type === successLogOut) {
        //Выход из сеанса
        let updateState = {...state};
        updateState.user = {};
        updateState.loading = false;
        return updateState;

    }

   return state
}

export default reducer;