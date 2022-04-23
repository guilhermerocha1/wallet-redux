// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  GET_COIN_SUCESS,
  GET_ECONOMIA_FAIL,
  GET_ECONOMIA_SUCESS,
  SAVE_INFO,
  GET_COIN_FAIL,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  exchangeRates: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_ECONOMIA_SUCESS:
    return { ...state, currencies: action.date };
  case GET_ECONOMIA_FAIL:
    return { ...state, error: action.error };
  case SAVE_INFO:
    return {
      currencies: state.currencies,
      exchangeRates: state.exchangeRates,
      expenses: [...state.expenses, action.info],
    };
  case GET_COIN_SUCESS:
    return { ...state, exchangeRates: action.coin };
  case GET_COIN_FAIL:
    return { ...state, error: action.error };
  default:
    return state;
  }
};

export default walletReducer;
