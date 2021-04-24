import { CHANGE_MAIN_CUR, CHANGE_SECOND_CUR, CHANGE_BOTH_CUR } from './types';

export const changeMainCurrency = (currency) => ({
  type: CHANGE_MAIN_CUR,
  payload: currency,
});

export const changeBothCurrency = (currency) => ({
  type: CHANGE_BOTH_CUR,
  payload: currency,
});

export const changeSecondCurrency = (currency) => ({
  type: CHANGE_SECOND_CUR,
  payload: currency,
});
