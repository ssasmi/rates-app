import { SET_FAVORITE, CHANGE_FAVORITE_LIST } from './types';

export const setFavoriteCurrency = (currency) => {
  localStorage.setItem('favoritesCur', JSON.stringify(currency));

  return {
    type: SET_FAVORITE,
    payload: currency,
  };
};

export const changeFavoriteCurrency = (id) => {
  let favoriteList = JSON.parse(localStorage.getItem('favorites')) || [];
  const index = favoriteList.indexOf(id);
  if (index >= 0) {
    favoriteList = favoriteList.filter((item) => item !== id);
  } else {
    favoriteList = favoriteList.concat(id);
  }

  localStorage.setItem('favorites', JSON.stringify(favoriteList));

  return {
    type: CHANGE_FAVORITE_LIST,
    payload: favoriteList,
  };
};
