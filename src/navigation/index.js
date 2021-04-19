import React from 'react';
import {Text, Image, Platform} from 'react-native';
import CurrentList from '../screens/CurrentList';
import ItemDetails from '../screens/ItemDetails';
import FavoritList from '../screens/FavoritesList';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

 const CurrentListStack = () => {

  return(
      <Stack.Navigator>
        <Stack.Screen name="Shopping List" component={CurrentList} />
        <Stack.Screen name="ItemDetails" component={ItemDetails}
           options={({route}) => {
             return {
               headerTitle: () => {
                 return <Text>{route.params.item.name}</Text>
               }
             }
           }}
        />
      </Stack.Navigator>
  )

}

const FavoriteListStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FavoritesList" component={FavoritList}></Stack.Screen>
    </Stack.Navigator>
  )
}

const Tabs  = () => {
  return(
    <NavigationContainer>
      <Tab.Navigator
         screenOptions={({route}) => ({
          tabBarIcon: ({ color, focused }) => {
            let image;
            const {name} = route;
            if(name === 'CurrentList') {
              image = Platform.select({
                ios: require('../assets/icons/ios-list.png'),
                android: require('../assets/icons/md-list.png')
              })
            }else if(name === 'FavoritesList'){
              image = Platform.select({
                ios: focused
                  ? require('../assets/icons/ios-star.png')
                  : require('../assets/icons/ios-star-outline.png'),
                android: focused
                  ? require('../assets/icons/md-star.png')
                  : require('../assets/icons/md-star-outline.png'),
              })
            }
            return <Image source={image}
                          resizeMode="contain"
                          style={{width: 25, tintColor: color}}
                          />
          },
        })}
      >
        <Tab.Screen name="CurrentList" component={CurrentListStack} />
        <Tab.Screen name="FavoritesList" component={FavoriteListStack}

        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default Tabs;

