import React, {useState, useEffect} from 'react';
import {v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';

const updateStoredCurrentList = (list) => {
  AsyncStorage.setItem('@@GroceryList/currentList', JSON.stringify(list));
}
const updateStoredCurrentCart = (cart) => {
  AsyncStorage.setItem('@@GroceryList/currentCart', JSON.stringify(cart));
}

export const useCurrentList = () => {
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);

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

  useEffect(() => {
    setTimeout(() => {
      Promise.all([
        AsyncStorage.getItem('@@GroceryList/currentList'),
        AsyncStorage.getItem('@@GroceryList/currentCart'),
      ])
      .then(([list, cartItems]) => [JSON.parse(list), JSON.parse(cartItems)])
      .then(([list, cartItems]) => {
        if(list) {
          setList(list);
        }
        if(cartItems) {
          setCart(cartItems)
        }
        setLoading(false)
      })
    }, 1000)
  }, [])

  return {
    list,
    loading,
    addItem,
    removeItem,
    cart,
    addToCart
  }
}
