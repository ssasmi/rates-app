import React from 'react';
import { CurrencyList } from '../../components/CurrencyList/CurrencyList';
import { FavoriteCurrency } from '../../components/FavoriteCurrency/FavoriteCurrency';

export function CurrencyConvertorPage() {
  return (
    <>
      <FavoriteCurrency />
      <CurrencyList />
    </>
  );
}
