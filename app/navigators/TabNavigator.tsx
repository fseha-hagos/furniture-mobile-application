import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../(auth)/home';
import Product from '../(auth)/product';
import Favorites from '../(auth)/favorites';
import Profile from '../(auth)/profile';
import Search from '../(auth)/search';
import { Ionicons } from '@expo/vector-icons';
import Cart from '../(auth)/cart';
import AddPostScreen from '../(auth)/addPostScreen';
import HomeStackNavigator from './HomeStackNavigator';
import ProfileStackNavigation from './ProfileStackNavigation';



const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (

    <Tab.Navigator
       
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color }) => {
          return <TabIcon name={route.name} focused={focused} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#C7C6CC',
      })}>
      
     
      <Tab.Screen name="home-navigator" component={HomeStackNavigator} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="profile-navigator" component={ProfileStackNavigation} />
      
      
    </Tab.Navigator>
    
  );
};


const TabIcon = ({ name , focused, color }:any) => {
  const icon = getIcon(name, focused);
  return icon;
};

const getIcon = (name:string, focused:string) => {
  switch (name) {
    case 'home-navigator':
      return focused ? <Ionicons name="home-sharp" size={24} color="black" /> : <Ionicons name="home-outline" size={24} color="black" />;
    case 'Product':
      return focused ? <Ionicons name="home-sharp" size={24} color="black" /> : <Ionicons name="home-outline" size={24} color="black" />;
    case 'Search':
      return focused ? <Ionicons name="search-sharp" size={24} color="black" /> : <Ionicons name="search-outline" size={24} color="black" />;
    case 'Favorites':
      return focused ? <Ionicons name="heart-sharp" size={24} color="black" /> : <Ionicons name="heart-outline" size={24} color="black" />;
    case 'profile-navigator':
      return focused ? <Ionicons name="person-circle" size={24} color="black" /> : <Ionicons name="person-circle-outline" size={24} color="black" />;
    default:
      return <Ionicons name="help-sharp" size={24} color="black" />;
  }
};


const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 50,
    position: 'absolute',
  },
});

export default TabNavigator;
