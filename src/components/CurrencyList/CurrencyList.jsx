import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import { changeFavoriteCurrency } from '../../redux/favoriteCurrency/action';
import { CurrencyValue } from '../../componentsHelper/CurrencyValue/CurrencyValue';

export function CurrencyList() {
  const dispatch = useDispatch();
  const currencyList = useSelector((store) => store.currencyReducer);
  const favoriteCurrency = useSelector((store) => store.favoriteCurrencyReducer);

  const calculateCurrency = (currency) => {
    let multiply = 1;
    const curValue = (((currency.Value / favoriteCurrency.currency.Value) / currency.Nominal)
                       * favoriteCurrency.currency.Nominal);
    const curPrev = (((currency.Previous / favoriteCurrency.currency.Previous) / currency.Nominal)
                       * favoriteCurrency.currency.Nominal);
    while ((curValue * multiply) < 1) {
      multiply *= 10;
    }
    return {
      ...currency,
      Nominal: 1 * multiply,
      Value: curValue * multiply,
      Previous: curPrev * multiply,
    };
  };

  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">За</TableCell>
            <TableCell align="left">Букв. код</TableCell>
            <TableCell align="left">Валюта</TableCell>
            <TableCell align="left">Получаешь</TableCell>
            <TableCell align="left">Избранная</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {currencyList
            .filter((currency) => currency.CharCode !== favoriteCurrency.currency.CharCode)
            .sort((a) => (favoriteCurrency.list.includes(a.ID) ? -1 : 1)).map(calculateCurrency)
            .map((currencyRow) => (
            <TableRow key={currencyRow.NumCode}>
              <TableCell align="left">{currencyRow.Nominal}</TableCell>
              <TableCell align="left">{currencyRow.CharCode}</TableCell>
              <TableCell align="left">{currencyRow.Name}</TableCell>
              <TableCell align="left">
                <CurrencyValue
                 prev={currencyRow.Previous}
                 value={currencyRow.Value}
                 code={favoriteCurrency.currency.CharCode}
                />
              </TableCell>
              <TableCell align="center">
                <FormControlLabel
                  control={
                    <Checkbox
                        onChange={() => dispatch(changeFavoriteCurrency(currencyRow.ID))}
                        checked={favoriteCurrency.list.includes(currencyRow.ID)}
                        icon={<FavoriteBorder />}
                        checkedIcon={<Favorite />}
                        name={currencyRow.CharCode}
                        label={currencyRow.CharCode}
                    />
                  }
                />
             </TableCell>
            </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
