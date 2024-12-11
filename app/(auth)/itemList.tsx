//import liraries
import { useRoute } from '@react-navigation/native';
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import Navbar from '../components/navbar';
import { DocumentData, collection, getDocs, limit, query, startAfter, where } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import ProductCards from '../components/productCards';
import { myProductsFromDatabasePeopsWithId } from '../context/constants';
import { Ionicons } from '@expo/vector-icons';

// create a component
const ItemList = ({ route }: any) => {

    const pageSize = 4;

    //const {params} =  useRoute();
   
    const [refreshing, setRefreshing] = useState(true);
    const [startingDoc, setStartingDoc] = useState<DocumentData | null>(null);
    const [previosStart, setPreviosStart] = useState<DocumentData | null>(null);
    const [latestCatagoryItemList, setLatestCatagoryItemlist] = useState<DocumentData[]>([]);
    const catagoryName:string = route.params?.item;

    useEffect(()=>{
        console.log(catagoryName)
        route && getLatestItems();
    }
    ,[route])

    const getItemListByCatagory = async () => {
        //const querySnapshots = await getDocs(query(collection(db, 'FurnitureData'), where("values.catagory", "==",catagoryName)));
        const q = query(collection(db,"FurnitureData"), where("values.catagory", "==",catagoryName))
        const querySnapshots = await getDocs(q);
        querySnapshots.forEach((doc) => {
            setLatestCatagoryItemlist(latestCatagoryItemList => [...latestCatagoryItemList, doc.data()])
            setRefreshing(false);
        })
        setRefreshing(false);
       
    }

    const getLatestItems = async() => {
        // Adjust based on your needs
        const q = query(collection(db, 'FurnitureData'), where("values.catagory", "==",catagoryName), limit(pageSize));
        const querySnapshot = await getDocs(q);

        setRefreshing(true);
        setLatestCatagoryItemlist([]);

        querySnapshot.forEach((doc) => {
        doc.data().values.id = doc.id;
        const productWithId = doc.data();
        productWithId.values.id = doc.id;
        setLatestCatagoryItemlist(latestCatagoryItemList => [...latestCatagoryItemList, productWithId]);
        setRefreshing(false);
        });
        setRefreshing(false);
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
        setLatestCatagoryItemlist([]);
        const prevQuery = query(
          collection(db, 'FurnitureData'),
          where("values.catagory", "==",catagoryName),
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
        
        setLatestCatagoryItemlist([]);
        let nextQuery = query(
          collection(db, 'FurnitureData'),
          where("values.catagory", "==",catagoryName),
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
        setLatestCatagoryItemlist(latestCatagoryItemList => [...latestCatagoryItemList, productWithId]);
      });
      
    
      setPreviosStart(nextSnapshot.docs[(nextSnapshot.docs.length - 1)-nextSnapshot.docs.length]);
      setStartingDoc(nextSnapshot.docs[nextSnapshot.docs.length - 1]); // Update cursor
      setRefreshing(false);
    };




    function handleLiked(items: myProductsFromDatabasePeopsWithId): void {
        throw new Error('Function not implemented.');
    }

    return (
        <SafeAreaView style={styles.container}>
            <Navbar title={catagoryName} showSearch={false} showBack={true} />

            {refreshing ? 
               (<View style={styles.contentConteiner}>
                   <ActivityIndicator size={'large'} color={"gray"} style={{marginTop:30}}/> 
                 </View>
                )
            :
         
                (latestCatagoryItemList.length > 0 ?
                <FlatList 
                numColumns={2}
               data={latestCatagoryItemList} 
               renderItem={({item ,index}) => (
                    <ProductCards
                       item={item.values}
                       //handleLiked={() => handleLiked(item)}
                       
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
                
             />  
             : 
             <View style={styles.contentConteiner}>
               <Text style={styles.notFoundText}> post not found</Text>
             </View>
             )
             }
           

        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,

    },
    contentConteiner: {
        flex: 1,
        alignItems: "center",
        marginTop: 150
    },
    notFoundText : {
        fontSize: 20
    },
    scrollInnerContainer: {
        paddingBottom: 100,
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
      }
});

//make this component available to the app
export default ItemList;
