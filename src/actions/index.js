import getEconomia from '../service';

// Coloque aqui suas actions
export const NEW_USER = 'NEW_USER';
export const GET_CURRENCIES_SUCESS = 'GET_CURRENCIES_SUCESS';
export const GET_CURRENCIES_FAIL = 'GET_CURRENCIES_FAIL';
export const SAVE_INFO = 'SAVE_INFO';
export const DELETE_LINE = 'DELETE_LINE';

export const userAction = (email) => ({
  type: NEW_USER,
  email,
});

export const actionGetEconomiaSucess = (date) => ({
  type: GET_CURRENCIES_SUCESS,
  date,
});

export const actionGetEconomiaFail = (error) => ({
  type: GET_CURRENCIES_FAIL,
  error,
});

export const thunkGetAPIEconomia = () => async (dispatch) => {
  try {
    const response = await getEconomia();
    const arrObj = Object.keys(response).filter((coin) => coin !== 'USDT');
    dispatch(actionGetEconomiaSucess(arrObj));
  } catch (error) {
    dispatch(actionGetEconomiaFail(error));
  }
};

export const actionSaveInfo = (info, coins) => ({
  type: SAVE_INFO,
  info,
  coins,
});

export const thunkGetCoin = (info) => async (dispatch) => {
  const response = await getEconomia();
  dispatch(actionSaveInfo(info, response));
};

export const deleteLine = (id) => ({
  type: DELETE_LINE,
  id,
});
