//import liraries
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Home from '../(auth)/home';
import Product from '../(auth)/product';
import Cart from '../(auth)/cart';
import AddPostScreen from '../(auth)/addPostScreen';
import ItemList from '../(auth)/itemList';


// create a component
const HomeStackNavigator = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen
          name="Home"
          component={Home}
          ></Stack.Screen>
        <Stack.Screen
          name="Product"
          component={Product}
          ></Stack.Screen>
          <Stack.Screen
          name="Cart"
          component={Cart}
          ></Stack.Screen>
           <Stack.Screen
          name="addProduct"
          component={AddPostScreen}
          ></Stack.Screen>
          <Stack.Screen 
          name="itemlist"
          component={ItemList}
          ></Stack.Screen>
      </Stack.Navigator>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default HomeStackNavigator;
