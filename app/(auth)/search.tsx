//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ScrollView, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import Navbar from '../components/navbar';

import ProductCards from '../components/productCards';
import ItemsCarousel from '../components/itemCero';

import { DocumentData, FieldPath, collection, getDocs, getFirestore, limit, query, startAfter, where } from 'firebase/firestore';



import { db } from '@/firebaseConfig';
import { useAuth } from '../context/cartContext';
import { Ionicons } from '@expo/vector-icons';


  
// create a component
const Search = () => {

  const pageSize = 4;

  //const {params} =  useRoute();
  
  const [refreshing, setRefreshing] = useState(true);
  const [startingDoc, setStartingDoc] = useState<DocumentData | null>(null);
  const [previosStart, setPreviosStart] = useState<DocumentData | null>(null);
  

  const [latestItemLists, setLatestItemLists] = useState<DocumentData[]>([]);


     
useEffect(() => {
  getLatestItems();
 }
,[])

const getLatestItemsS = async() => {
  setLatestItemLists([]);
  // const querySnapshots = await getDocs(collection(db, 'ProductDataTest'));
   const querySnapshots = await getDocs(collection(db, 'FurnitureData'));
  querySnapshots.forEach((doc) => {
    doc.data().values.id = doc.id; 
    const productWithId =  doc.data()
    productWithId.values.id = doc.id;
    setLatestItemLists(latestItemLists => [...latestItemLists, productWithId]);  
    setRefreshing(false)
  })
}

const getLatestItems = async() => {
  // Adjust based on your needs
  setLatestItemLists([]);
 
   const q = query(collection(db, 'FurnitureData'), limit(pageSize));
  //  const q = query(collection(db, 'ProductDataTest'), limit(pageSize));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
  doc.data().values.id = doc.id;
  const productWithId = doc.data();
  productWithId.values.id = doc.id;
  setLatestItemLists(latestItemLists => [...latestItemLists, productWithId]);
  });
  setRefreshing(false)
  setPreviosStart(querySnapshot.docs[(querySnapshot.docs.length - 1)-querySnapshot.docs.length]);
  setStartingDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
 
}

const handleLoadMore = async (side: number) => {
  let nextSnapshot:DocumentData | undefined = undefined;
  
    setRefreshing(true);
    if(side===1){
      console.log("previosStart:  ",previosStart)
      if (!previosStart){
        getLatestItems();
        return;
      }
      setLatestItemLists([]);
      const prevQuery = query(
        collection(db, 'FurnitureData'),
          startAfter(previosStart),
          limit(pageSize)
      )
       nextSnapshot = await getDocs(prevQuery);
    }
    else{
      if (!startingDoc){
        console.log("there is no data here")
        getLatestItems();
        return;
      } 
      
      setLatestItemLists([]);
      let nextQuery = query(
        collection(db, 'FurnitureData'),
        startAfter(startingDoc),
        limit(pageSize)
    );
     nextSnapshot = await getDocs(nextQuery);
     if(nextSnapshot.size === 0){
      getLatestItems();
      return;
     } 
    }

    // Process data as before
    nextSnapshot.forEach((doc:DocumentData) => {
      doc.data().values.id = doc.id;
      const productWithId = doc.data();
      productWithId.values.id = doc.id;
      setLatestItemLists(latestItemLists => [...latestItemLists, productWithId]);
    });
    
  
    setPreviosStart(nextSnapshot.docs[(nextSnapshot.docs.length - 1)-nextSnapshot.docs.length]);
    setStartingDoc(nextSnapshot.docs[nextSnapshot.docs.length - 1]); // Update cursor
    setRefreshing(false);
  };



    return (
      
        <SafeAreaView style={styles.container}>
          <Navbar title="All Products" showSearch={true} showBack={true} />
         
          {

refreshing ? <ActivityIndicator /> :
        (
           ( latestItemLists!.length > 0 )? 
            (<FlatList 
              numColumns={2}
             data={latestItemLists} 
             renderItem={({item ,index}) => (
                  <ProductCards 
                     item={item.values}
                     key={index}
                     />
             )} 
            
             showsVerticalScrollIndicator={false}
             ListFooterComponent={
              <View style={styles.scrollInnerContainer}>
                <View style={styles.paginationContainer}>
                  <TouchableOpacity style={styles.pagination} onPress={ ()=>handleLoadMore(1)}>
                  <Ionicons name="chevron-back-outline" size={24} color="#00685C" />
                 
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.pagination} onPress={ ()=>handleLoadMore(2)}>
                   
                   <Ionicons name="chevron-forward" size={24} color="#00685C" />
                  </TouchableOpacity>
                  
                </View>
                  
              </View>
   
            }
           
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={ getLatestItems} />
            }
           />) :
           <View style={styles.noProductTextContainer}>
             <Text style={styles.noProductText}>Sorry, there is no any products for now.</Text>
               </View>
          )
          }
          
          </SafeAreaView>
      );
   
    };
    
    export default Search;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        paddingBottom: 60,
      },
     
      scrollContainer: {
        flex: 1,
      },
      scrollInnerContainer: {
        paddingBottom: 10,
      },
      paginationContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 20,
        marginVertical: 15,
    
      },
      pagination: {
        display: "flex",
        flexDirection: "row",
        borderRadius: 10,
        padding:3,
        width: 60,
        borderWidth: 2,
        borderColor: "#00685C",
        backgroundColor: "white",
    
        alignItems: "center",
        justifyContent: "center"
      },
      noProductTextContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: "50%"
      },
      noProductText : {
        color: "#757575"
      }
     
    });



