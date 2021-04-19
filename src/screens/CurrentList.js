import React, { useState, useEffect } from 'react';
import { View,
         SectionList,
         Text,
         SafeAreaView,
         FlatList,
         KeyboardAvoidingView,
         ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import ListItem, {Separator, SectionHeader} from '../components/ListItem';
import AddItem from '../components/addItem';
import {useCurrentList} from '../util/ListManager';

export default  ({ navigation}) => {

  const {
    list,
    loading,
    addItem,
    removeItem,
    cart,
    addToCart
  } = useCurrentList()

  if(loading) {
    return (
      <SafeAreaView>
        <Text>
          loading
        </Text>
      </SafeAreaView>
    )
  }

  console.log('cart', cart);

  return (
    <SafeAreaView style={{flex: 1}}>
      <KeyboardAvoidingView
         style={{flex: 1}}
         behavior="padding"
      >
        <SectionList
          sections={[
            {title: 'List', data: list},
            {title:'Cart', data: cart}
          ]}
            renderSectionHeader={({section}) => {
              <SectionHeader title={section.title} />
            }}
            renderItem={({item, index}) => (
              <ListItem
                name={item.name}
                onFavoritePress={() => alert('todo: handle favorite')}
                isFavorite={index < 2}
                onAddedSwipe={() => addToCart(item)}
                onDeleteSwipe={() => removeItem(item.id)}
                onRowPress = {() => {
                  navigation.navigate('ItemDetails', {item})
                }}
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
