import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import styles from './ExchangeInput.module.css';

const NUMBER_REGEXP = /^[0-9]*[.]?[0-9]*$/;

export function ExchangeInput({
  value, changeHandler, readOnly, name,
}) {
  const changeInputValidation = (inputValue) => {
    if (NUMBER_REGEXP.test(inputValue)) {
      changeHandler(inputValue);
    }
  };

  return (
    <>
      <TextField
        className={styles.input}
        InputProps={{
          style: { fontSize: 40 },
          inputProps: { min: 0 },
          readOnly,
        }}
        fullWidth
        value={value}
        onChange={(evt) => changeInputValidation(evt.target.value)}
        label={name}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />
      Сюда потом допишу
    </>
  );
}

ExchangeInput.propTypes = {
  value: PropTypes.string.isRequired,
  changeHandler: PropTypes.func,
  readOnly: PropTypes.bool,
  name: PropTypes.string.isRequired,
};

ExchangeInput.defaultProps = {
  changeHandler: () => {},
  readOnly: false,
};
