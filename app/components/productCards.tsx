//import liraries
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { DocumentData } from 'firebase/firestore';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useAuth } from '../context/cartContext';
import {myProductsFromDatabasePeopsWithId, myProductsFromDatabaseProps} from '../context/constants'


// create a component

interface productType {
    id: number;
    name: string;
    price: number;
    image: number; // Assuming image is a number (might need correction)
    color: string;
    isNew: boolean;
    isLiked: boolean;
    rating: number;
    colors: string[];
    description: string;
  }
// interface props {
//     item : myProductsFromDatabasePeopsWithId,
//    // handleLiked: (items: myProductsFromDatabasePeopsWithId)=> void;
    
//     //handleLiked: (items: {id: number,name: string, price: number, image: number, color: string, isNew: boolean, isLiked: boolean, rating: number, colors: string[], description: string})=> void;
// }
 

// interface ProductStackParamList {
//     Product: { item: myProductsFromDatabasePeopsWithId }; // Assuming Product is defined elsewhere
//   }


interface props {
    item : myProductsFromDatabasePeopsWithId,
   // handleLiked: (items: myProductsFromDatabasePeopsWithId)=> void;
    
    //handleLiked: (items: {id: number,name: string, price: number, image: number, color: string, isNew: boolean, isLiked: boolean, rating: number, colors: string[], description: string})=> void;
}
  interface ProductStackParamList {
    Product: { item: myProductsFromDatabasePeopsWithId }; // Assuming Product is defined elsewhere
  }

const ProductCards = ({ item }: props) => {
    const navigation = useNavigation<NavigationProp<myProductsFromDatabasePeopsWithId>>();
    const [isLiked, setIsLiked] = useState(false);

    const {handleLiked, likedProducts} = useAuth();
    
   
   useEffect(() => {
    const isLiked = likedProducts?.some((liked) => liked.id === item.id);
     if (isLiked) {
        setIsLiked(true)
    }else{
        setIsLiked(false)
    }
   },[handleLiked])
    

    return (
        
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate("Product", { item: item })}>
            <Image source={{uri: item.image}} style={styles.coverImage}/>
            <View style={styles.content}>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>{item.price}</Text>
            </View>
            
                <TouchableOpacity 
                      onPress={() => handleLiked!(item) }
                      style={styles.likeContainer}>

                {
                   
                   isLiked? 
                       <FontAwesome name="heart" size={20} color="#E55B5B" />:
                       <Entypo name="heart-outlined" size={24} color="black" /> 
                     
                        }
                </TouchableOpacity>
                
                </TouchableOpacity>
            
        
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
       position: "relative",
      
       borderWidth: 1,
       borderColor: "#00000010",
       margin: 3,
       borderRadius: 20
        },
    coverImage: {
           
            height: 256,    
            borderRadius: 20,
            marginVertical: 5,
            marginHorizontal: 5,
            width: '95%'
        },   
        content: {
            paddingLeft: 17
        },
        likeContainer: {
            height: 34,
            width: 34,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 20,
            position: "absolute",
            top: 20,
            right: 20
        },
    title: {
        fontSize: 18,
        color: "#444444",
        fontWeight: "600"
    },
    price: {
        fontSize: 16,
        color: "#9C9C9C",
        fontWeight: "600"
    }
});

//make this component available to the app
export default ProductCards;
