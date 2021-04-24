import React, { useEffect } from 'react';
import { StylesProvider } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {
  Switch, NavLink, Route, useLocation,
} from 'react-router-dom';
import { getCurrencyList } from './redux/Currency/action';
import { CurrencyConvertorPage } from './pages/CurrencyConvertorPage/CurrencyConvertorPage';
import styles from './App.module.css';
import { ExchangeRatePage } from './pages/ExchangeRatePage/ExchangeRatePage';
import { ErrorPage } from './pages/ErrorPage/ErrorPage';

const links = [
  {
    name: 'Курс валют',
    path: '/',
  },
  {
    name: 'Калькулятор валют',
    path: '/calc',
  },
];

function App() {
  const location = useLocation();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrencyList());
  }, [dispatch]);

  return (
    <StylesProvider injectFirst>
      <div className={styles.container}>
        <ButtonGroup className={styles.buttons} size="large" color="primary" aria-label="large outlined primary button group">
          {links.map((button) => (
            <Button
              variant={button.path === location.pathname ? 'contained' : ''}
              className={styles.button}
              key={button.path}
              component={NavLink}
              to={button.path}
            >
              {button.name}
            </Button>
          ))}
        </ButtonGroup>

        <Switch>
          <Route exact path="/">
           <CurrencyConvertorPage />
          </Route>
          <Route exact path="/calc">
            <ExchangeRatePage />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      </div>
    </StylesProvider>
  );
}

export default App;
