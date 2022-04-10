// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_ECONOMIA_FAIL, GET_ECONOMIA_SUCESS } from '../actions';

const INITIAL_STATE = {
  currencies: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_ECONOMIA_SUCESS:
    return { ...state, currencies: action.date };
  case GET_ECONOMIA_FAIL:
    return { ...state, error: action.error };
  default:
    return state;
  }
};

export default walletReducer;
