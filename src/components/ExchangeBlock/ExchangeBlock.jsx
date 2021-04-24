import React from 'react';
import PropTypes from 'prop-types';
import styles from './ExchangeBlock.module.css';
import { ExchangeInput } from '../ExchangeInput/ExchangeInput';
import { ExchangeSelectCurrency } from '../ExchangeSelectCurrency/ExchangeSelectCurrency';

export function ExchangeBlock({
  inputValue, inputValueHandler, readOnly, name, activeCur, changeCur,
}) {
  return (
    <div className={styles.container}>
      <ExchangeSelectCurrency
        activeCur={activeCur}
        changeCur={changeCur}
      />

      <ExchangeInput
        name={name}
        value={inputValue}
        changeHandler={inputValueHandler}
        readOnly={readOnly}
      />
    </div>
  );
}

ExchangeBlock.propTypes = {
  inputValue: PropTypes.string.isRequired,
  inputValueHandler: PropTypes.func,
  readOnly: PropTypes.bool,
  name: PropTypes.string.isRequired,
  activeCur: PropTypes.shape({
    CharCode: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
    Name: PropTypes.string.isRequired,
    Nominal: PropTypes.number.isRequired,
    NumCode: PropTypes.string.isRequired,
    Previous: PropTypes.number.isRequired,
    Value: PropTypes.number.isRequired,
  }).isRequired,
  changeCur: PropTypes.func.isRequired,
};

ExchangeBlock.defaultProps = {
  inputValueHandler: () => {},
  readOnly: false,
};
