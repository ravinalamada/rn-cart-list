import React from 'react';
import {
         SectionList,
         Text,
         SafeAreaView,
         KeyboardAvoidingView} from 'react-native'
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
    addToCart,
    favoritedItem,
    addFavoritedItems,
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
            renderSectionHeader={({section}) => (
              <SectionHeader title={section.title} />
            )}
            renderItem={({item, index}) => (
              <ListItem
                name={item.name}
                onFavoritePress={() => addFavoritedItems(item)}
                isFavorite={favoritedItem.find(i => i.id === item.id ? true : false
                )}
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
