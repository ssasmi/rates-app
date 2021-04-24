import { GET_CURRENCY } from './types';

const setCurrencyList = (currencyList) => ({
  type: GET_CURRENCY,
  payload: currencyList,
});

export const getCurrencyList = () => (dispatch) => {
  fetch('https://www.cbr-xml-daily.ru/daily_json.js')
    .then((response) => response.json())
    .then((item) => dispatch(
      setCurrencyList(Object.values(item.Valute)),
    ));
};
