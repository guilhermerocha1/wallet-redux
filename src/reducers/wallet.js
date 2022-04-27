// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  DELETE_LINE,
  GET_CURRENCIES_FAIL,
  GET_CURRENCIES_SUCESS,
  SAVE_INFO,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCIES_SUCESS:
    return { ...state, currencies: action.date };
  case GET_CURRENCIES_FAIL:
    return { ...state, error: action.error };
  case SAVE_INFO:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.info, exchangeRates: action.coins },
      ],
    };
  case DELETE_LINE:
    return {
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.id),
    };
  default:
    return state;
  }
};

export default walletReducer;
