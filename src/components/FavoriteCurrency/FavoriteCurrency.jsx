import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { FormControl } from '@material-ui/core';
import style from './FavoriteCurrency.module.css';
import { setFavoriteCurrency } from '../../redux/favoriteCurrency/action';
import { changeBothCurrency } from '../../redux/exchangeCurrency/actions';

export function FavoriteCurrency() {
  const dispatch = useDispatch();
  const currency = useSelector((store) => store.currencyReducer);
  const favoriteCurrency = useSelector((store) => store.favoriteCurrencyReducer);

  const setFavoriteHandler = (evt) => {
    const favorite = currency.filter((item) => (
      item.CharCode === evt.target.value
    ));
    dispatch(setFavoriteCurrency(...favorite));
    dispatch(changeBothCurrency(...favorite));
  };

  return (
    <div className={style.container}>
      <p className={style.text}> Базовая валюта : </p>
      <FormControl >
        <Select
            value={currency.length > 1 ? favoriteCurrency.currency.CharCode : ''}
            onChange={(evt) => setFavoriteHandler(evt)}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            {currency.map((item) => (
              <MenuItem key={item.NumCode} value={item.CharCode}>{item.Name}</MenuItem>
            ))}

          </Select>
        </FormControl>
    </div>
  );
}
