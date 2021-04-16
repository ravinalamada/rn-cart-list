import React, { useState, useEffect } from 'react';
import { View,
         Text,
         SafeAreaView,
         FlatList,
         KeyboardAvoidingView,
         ActivityIndicator } from 'react-native'
// import nachos from '../data/nachos';
import {v4 as uuid } from 'uuid';
import AsyncStorage from '@react-native-community/async-storage';
import ListItem, {Separator} from '../components/ListItem';
import AddItem from '../components/addItem';
import {useCurrentList} from '../util/ListManager';

export default () => {

  const {
    list,
    loading,
    addItem,
    removeItem} = useCurrentList()

  if(loading) {
    return (
      <SafeAreaView>
        <Text>
          loading
        </Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
         style={{flex: 1}}
         behavior="padding"
      >
        <FlatList
          data={list}
            renderItem={({item, index}) => (
              <ListItem
                name={item.name}
                onFavoritePress={() => alert('todo: handle favorite')}
                isFavorite={index < 2}
                onAddedSwipe={() => removeItem(item.id)}
                onDeleteSwipe={() => removeItem(item.id)}
              />
          )}
          KeyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <Separator />}
          ListHeaderComponent={() => (
            <AddItem
              onSubmitEditing={({nativeEvent: {text}}) => addItem(text)}
            />
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
};
