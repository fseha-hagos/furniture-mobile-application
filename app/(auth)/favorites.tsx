//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView } from 'react-native';
import Navbar from '../components/navbar';

import ProductCards from '../components/productCards';
import ItemsCarousel from '../components/itemCero';

import { DocumentData, FieldPath, collection, getDocs, getFirestore, query, where } from 'firebase/firestore';



import { db } from '@/firebaseConfig';
import { useAuth } from '../context/cartContext';


  
export const sampleProduct = [

    { id: 1,   
      name: 'Sebastian chairs',
      price: 286,
      image: require('../assets/images/chair1.png'),
      color: '#F7F7F7',
      isNew: true,
      isLiked: true,
      rating: 4,
      colors: ['#CDCDCD', '#DCDCDC', 'red'],
      description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  
    },
    {
      id: 2,
      name: 'Sebastian chairs',
      price: 349.99,
      image: require('../assets/images/chair2.png'),
      color: '#FEF5EE',
      isNew: false,
      isLiked: false,
      rating: 4,
      colors: ['black', 'pink', 'red'],
      description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  
    },
    {
      id: 3,
      name: 'Sebastian chairs',
      price: 400,
      image: require('../assets/images/sofa/3.jpg'),
      color: '#F7F7F7',
      isNew: false,
      isLiked: false,
      rating: 4,
      colors: ['black', 'pink', 'red'],
      description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  
    },
    {
      id: 4,
      name: 'Sebastian chairs',
      price: 349.99,
      image: require('../assets/images/chair1.png'),
      color: '#FEF5EE',
      isNew: false,
      isLiked: false,
      rating: 4,
      colors: ['black', 'pink', 'red'],
      description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  
    },
  ];

// create a component
const Favorites = () => {


   const [favoriteProducts, setFavoriteProducts] = React.useState<DocumentData[]>([]);
    const {likedProducts} = useAuth();


    return (
      
        <SafeAreaView style={styles.container}>
          <Navbar title="My Favorite" showSearch={false} showBack={true} />
         
          {
           ( likedProducts!.length > 0 )? 
            (<FlatList 
              numColumns={2}
             data={likedProducts} 
             renderItem={({item ,index}) => (
                  <ProductCards 
                     item={item}
                     key={index}
                     />
             )} 
             keyExtractor={item => item.id}
             showsVerticalScrollIndicator={false}
           />) :
           <View style={styles.noLikedTextContainer}>
             <Text style={styles.noLikedText}>There is no liked products.</Text>
             <Text style={styles.noLikedText}>Click the like button on the products sectioin to save your favorite products</Text>
           </View>
          
          }
          
          </SafeAreaView>
      );
   
    };
    
    export default Favorites;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 60,
      },
     
      scrollContainer: {
        flex: 1,
      },
      noLikedTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%"
      },
      noLikedText : {
        color: "#757575"
      }
     
    });

//make this component available to the app

