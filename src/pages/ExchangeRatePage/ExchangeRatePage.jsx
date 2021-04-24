import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ExchangeRatePage.module.css';
import { ExchangeBlock } from '../../components/ExchangeBlock/ExchangeBlock';
import { changeMainCurrency, changeSecondCurrency, changeBothCurrency } from '../../redux/exchangeCurrency/actions';

export function ExchangeRatePage() {
  const dispatch = useDispatch();
  const currency = useSelector((store) => store.exchangeCurrencyReducer);
  const favoriteCurrency = useSelector((store) => store.favoriteCurrencyReducer.currency);
  const [fromValue, changeFromValue] = useState("0");
  const [toValue, changeToValue] = useState("0");

  useEffect(() => {
    const rate = (((currency.mainCurrency.Value / currency.secondCurrency.Value)
                / currency.mainCurrency.Nominal) * currency.secondCurrency.Nominal)
                * fromValue;

    changeToValue(rate.toFixed(2));
  }, [fromValue, currency.mainCurrency.Value, currency.secondCurrency.Value,
    currency.mainCurrency.Nominal, currency.secondCurrency.Nominal]);

  useEffect(() => {
    dispatch(changeBothCurrency(favoriteCurrency));
  }, [favoriteCurrency, dispatch]);

  return (
    <div className={styles.container}>
      <ExchangeBlock
        inputValue={fromValue}
        inputValueHandler={changeFromValue}
        name="Отдаешь"
        activeCur={currency.mainCurrency}
        changeCur={changeMainCurrency}
      />
      <ExchangeBlock
        inputValue={toValue}
        readOnly
        activeCur={currency.secondCurrency}
        name="Получаешь"
        changeCur={changeSecondCurrency}
      />

    </div>
  );
}
