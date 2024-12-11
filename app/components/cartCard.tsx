//import liraries
import { Ionicons } from '@expo/vector-icons';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {myProductsFromDatabasePeopsWithId} from '../context/constants'
import { useNavigation, NavigationProp } from '@react-navigation/native';

// create a component


  

interface prop {
    item: myProductsFromDatabasePeopsWithId
    deleteFromCart: any;
}

interface ProductStackParamList {
    Product: { item: myProductsFromDatabasePeopsWithId }; // Assuming Product is defined elsewhere
  }

const CartCard = ({item, deleteFromCart}: prop) => {
    const navigation = useNavigation<NavigationProp<ProductStackParamList>>();

    return (
        <View style={styles.container}>
            <Image source={{uri: item.image}} style={styles.coverImage}/>
            <View style={styles.cartContent}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.price}>Birr {item.price}</Text>
            <View style={styles.circleSizeContainer}>
            <View style={[styles.circle, {backgroundColor: item.color === null ? '"#7094C1"' : item.color}]} /> 
                
                
                <Text style={styles.quantityContainer}> +{item.totalPurchase} </Text>
            </View>
            </View>
            <View style={{alignItems: 'center', gap: 15}}>
                <TouchableOpacity onPress={() => {deleteFromCart(item)}}>

                <Ionicons name='trash-outline' size={24} color="black"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate("Product", { item: item })}><Text style={styles.checkoutText}>checkout</Text></TouchableOpacity>
            </View>
           
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: 'center',
        marginVertical: 10,
        padding:10

    },
    coverImage: {
        width: "20%",
        height:100,
        borderRadius: 10
    },
    checkoutText : {
        backgroundColor: 'black', 
        color: 'white', 
        padding:2,
        paddingHorizontal: 8, 
        borderRadius: 5, 
        textAlign: 'center'
    },
    cartContent: {
        flex: 1,
        marginHorizontal: 7
    },
    title: {
        color: "#444444",
        fontSize: 17
    },
    price: {
        color: "#797979",
    },
    circle: {
        width: 25,
        height: 25,
        borderRadius: 20,
        backgroundColor: "#7094C1"
    },
    circleSizeContainer: {
        marginVertical: 5,
        flexDirection: "row"
    },
    quantityContainer : {
       
        height: 25,
        marginHorizontal: 7,
        fontWeight: "500",
        fontSize: 17
    }
});


export default CartCard;
