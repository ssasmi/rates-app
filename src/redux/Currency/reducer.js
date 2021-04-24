import { GET_CURRENCY } from './types';

const initialState = [{
  ID: 'R01',
  NumCode: '643',
  CharCode: 'RUB',
  Nominal: 1,
  Name: 'Российский рубль',
  Value: 1.0,
  Previous: 1.0,
}];

export const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CURRENCY:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
