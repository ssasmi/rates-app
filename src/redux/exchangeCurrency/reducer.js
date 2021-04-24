import { CHANGE_MAIN_CUR, CHANGE_SECOND_CUR, CHANGE_BOTH_CUR } from './types';

const initialCurrency = JSON.parse(localStorage.getItem('favoritesCur')) || {
  ID: 'R01',
  NumCode: '643',
  CharCode: 'RUB',
  Nominal: 1,
  Name: 'Российский рубль',
  Value: 1.00,
  Previous: 1.00,
};

const initialState = {
  mainCurrency: initialCurrency,
  secondCurrency: initialCurrency,
};

export const exchangeCurrencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_MAIN_CUR:
      return { ...state, mainCurrency: action.payload };
    case CHANGE_SECOND_CUR:
      return { ...state, secondCurrency: action.payload };
    case CHANGE_BOTH_CUR:
      return { ...state, mainCurrency: action.payload, secondCurrency: action.payload };
    default:
      return state;
  }
};
