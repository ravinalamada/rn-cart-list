import React, {useState, useEffect} from 'react';
import {v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

const updateStoredCurrentList = (list) => {
  AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list));
}
const updateStoredCurrentCart = (cart) => {
  AsyncStorage.setItem('@@GroceryList/currentCart', JSON.stringify(cart));
}
const updateStoredCurrentFavoritedCart = (favoritedItem) => {
  AsyncStorage.setItem('@@GroceryList/currentFavoritedCart', JSON.stringify(favoritedItem));
}

export const useCurrentList = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [favoritedItem, setFavoritedItem] = useState([]);

  const addItem = (text) => {
    const newList = [{id: uuid(), name: text},...list];
    setList(newList);
    updateStoredCurrentList(newList)
  }

  const removeItem = (id) => {
    const newList = list.filter(item => item.id !== id);
    setList(newList)
    updateStoredCurrentList(newList)
  }

  const addToCart = (item) => {
    removeItem(item.id)
    const newCart = [item,...cart];
    setCart(newCart);
    updateStoredCurrentCart(newCart)
  }

  const addFavoritedItems = (item) => {
    const favoriteItemList = [item, ...favoritedItem]
    setFavoritedItem(favoriteItemList);
    updateStoredCurrentFavoritedCart(favoriteItemList)
  }

  const removeFavoritedItems = (id) => {
    const newFavoriteItemList = favoritedItem.filter(item => item.id !== id)
    newFavoriteItemList.find(item => {
      if(item.id === id) {
        item.isFavorite = false
      }
    })
    setFavoritedItem(newFavoriteItemList);
   updateStoredCurrentFavoritedCart(newFavoriteItemList)
  }


  useEffect(() => {
    setTimeout(() => {
      Promise.all([
        AsyncStorage.getItem('@@GroceryList/currentList'),
        AsyncStorage.getItem('@@GroceryList/currentCart'),
        AsyncStorage.getItem('@@GroceryList/currentFavoritedCart'),
      ])
      .then(([list, cartItems, favoritedItem]) => [JSON.parse(list), JSON.parse(cartItems), JSON.parse(favoritedItem)])
      .then(([list, cartItems, favoritedItem]) => {
        if(list) {
          setList(list);
        }
        if(cartItems) {
          setCart(cartItems)
        }
        if(favoritedItem) {
          setFavoritedItem(favoritedItem)
        }
        setLoading(false)
      })
    }, 1000)
  }, [])

  // AsyncStorage.clear()

  return {
    list,
    loading,
    addItem,
    removeItem,
    cart,
    addToCart,
    favoritedItem,
    addFavoritedItems,
    removeFavoritedItems,
  }
}
