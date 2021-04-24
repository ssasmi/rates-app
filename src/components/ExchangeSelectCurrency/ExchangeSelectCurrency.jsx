import React, { useMemo, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { useSelector, useDispatch } from 'react-redux';
import styles from './ExchangeSelectCurrency.module.css';

const BUTTONS_COUNT = 3;

export function ExchangeSelectCurrency({ activeCur, changeCur }) {
  const [isOpen, setOpen] = useState(false);
  const currencyList = useSelector((store) => store.currencyReducer);
  const favoriteCurrency = useSelector((store) => store.favoriteCurrencyReducer);
  const popupRef = useRef(null);
  const dispatch = useDispatch();
  const [selectedIndex, setSelectedIndex] = useState(3);

  const sorted = useMemo(() => currencyList.slice().sort((a, b) => {
    if (a.ID === favoriteCurrency.currency.ID) return -1;
    if (b.ID === favoriteCurrency.currency.ID) return 1;
    if (favoriteCurrency.list.includes(a.ID) > favoriteCurrency.list.includes(b.ID)) return -1;
    return 1;
  }), [currencyList, favoriteCurrency]);

  const handlePopupToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handlePopupClose = (evt) => {
    if (popupRef.current && popupRef.current.contains(evt.target)) {
      return;
    }

    setOpen(false);
  };

  const handlePopupItemClick = (index) => {
    setSelectedIndex(index);
    dispatch(changeCur(sorted[index]));

    setOpen(false);
  };

  return (
    <>
    <ButtonGroup
      size="small"
      className={styles.buttons}
      color="primary"
      aria-label="buttons"
    >
      {sorted.slice(0, BUTTONS_COUNT).map((button) => (
        <Button
          onClick={() => {
            dispatch(changeCur(button));
          }}
          key={button.ID}
          variant={button.ID === activeCur.ID ? 'contained' : ''}
          className={styles.button}
        >
          {button.CharCode}
        </Button>
      ))}
      <Button
        onClick={() => {
          dispatch(changeCur(sorted[selectedIndex]));
        }}
        variant={sorted[selectedIndex] && sorted[selectedIndex].ID === activeCur.ID ? 'contained' : ''}
        className={styles.button}
      >
        {sorted.length > 1 && sorted[selectedIndex].CharCode}
      </Button>
      <Button
        ref={popupRef}
        onClick={handlePopupToggle}
      >
        {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Button>
    </ButtonGroup>
    <Popper
      open={isOpen}
      anchorEl={popupRef.current}
      role={undefined}
      transition
      style={{ zIndex: 2 }}
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
          }}
        >
         <Paper elevation={3}>
          <ClickAwayListener onClickAway={handlePopupClose}>
            <MenuList
              style={{ maxHeight: 450, overflow: 'auto' }}
            >
             {sorted.slice(BUTTONS_COUNT).map((item, index) => (
                <MenuItem
                  key={item.ID}
                  selected={item.ID === sorted[selectedIndex].ID}
                  onClick={() => handlePopupItemClick(index + BUTTONS_COUNT)}
                >
                  {item.Name}
                </MenuItem>
             ))}
            </MenuList>
          </ClickAwayListener>
         </Paper>
        </Grow>
      )}
    </Popper>
    </>
  );
}

ExchangeSelectCurrency.propTypes = {
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
