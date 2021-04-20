import React from 'react';
import ListItem from '../components/ListItem'
import {
  SectionList,
  Text,
  SafeAreaView,
  SectionHeader,
  KeyboardAvoidingView} from 'react-native'

  import {useCurrentList} from '../util/ListManager';
export default () => {
  const {
    favoritedItem,
    removeFavoritedItems,
  } = useCurrentList()
  return (
    <SafeAreaView style={{flex: 1}}>
    <KeyboardAvoidingView
       style={{flex: 1}}
       behavior="padding"
    >
      <SectionList
        sections={[
          { data: favoritedItem},
        ]}
          renderItem={({item}) => (
            <ListItem
              name={item.name}
              onFavoritePress={() => removeFavoritedItems(item.id)}
              isFavorite={true}
            />
        )}
        KeyExtractor={(item) => item.id}
      />
    </KeyboardAvoidingView>
  </SafeAreaView>
  )
};
