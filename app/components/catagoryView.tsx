//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';


interface prop {
    item : string,
    selectedCategory: string,
    onSelect: (item: string)=> void;
  }
  
// create a component
const MyComponent = ({item, selectedCategory, onSelect}: prop) => {
    return (
        <TouchableOpacity onPress={() =>onSelect(item)}>
            <Text style={[styles.catagoryText, selectedCategory === item && {
                color: "white",
                backgroundColor: "#00685C"
            }]}>{item}</Text>
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    catagoryText: {
      
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DFDCDC',
        padding: 9,
        marginHorizontal: 10,
        marginVertical: 10,
        borderRadius: 10,
        fontSize: 16,
        fontWeight: '400',
        color: "#938F8F"
    },
   
});

//make this component available to the app
export default MyComponent;
