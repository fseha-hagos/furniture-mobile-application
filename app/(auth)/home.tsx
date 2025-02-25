import { FlatList, Image, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { Component, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import NavBar from '../components/navbar';
import CategoryTabs from '../components/categoryTabs';
import ItemsCarousel from '../components/itemCero';
import Offers from '../components/offers';


import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useNavigation } from 'expo-router';
import Product from './product';
import MyComponent from '../components/catagoryView';
import ProductCards from '../components/productCards';
import data from '../data/data.json'
import assets from 'expo-asset'
import { DocumentData, collection, getDocs, limit, query, startAfter } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
import { NavigationProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';


//const Stack = createStackNavigator();
const catagories = ["Sofa", "Chair", "Beds", "Table", "Lamps"]


export const sampleProduct = [

        { id: 1,   
          name: 'Sebastian chairs',
          price: 286,
          image: require('../assets/images/chair1.png'),
          color: '#F7F7F7',
          isNew: true,
          isLiked: false,
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

      

interface itemProps   {
  id: string,
  name: string, 
  price: number, 
  image: number, 
  color: string, 
  isNew: boolean, 
  isLiked: boolean, 
  rating: number, 
  colors: string[], 
  description: string}

  interface ProductStackParamList {
    itemlist: { item: string }; // Assuming Product is defined elsewhere
  }
   
const Layout = () => {

  const pageSize = 3;
      

        
    const navigation = useNavigation<NavigationProp<ProductStackParamList>>();
    
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  //const [isLiked, setIsLiked] = React.useState(false);
 // const [products, setProducts] = useState([]);
  const [sliderList, setSliderList] = useState<DocumentData[]>([]);
  const [catagoryList, setCatagoryList] = useState<DocumentData[]>([]);
  const [latestItemLists, setLatestItemLists] = useState<DocumentData[]>([]);

  const [lastItem, setLastItem] = useState<DocumentData[]>();
  const [refreshing, setRefreshing] = useState(true);
  const [startingDoc, setStartingDoc] = useState<DocumentData | null>(null);
  const [previosStart, setPreviosStart] = useState<DocumentData | null>(null);
 
  
useEffect(() => {
  getCatagoryList();
  getSliders();
 // setSelectedCategory("All"); 
 // getLatestItems();
 getLatestItems();
 // console.log("catagoryList",catagoryList)

}
,[selectedCategory])

  const getSliders = async () => {
    setSliderList([]);
    const querySnapshots = await getDocs(collection(db, "Sliders"));
    querySnapshots.forEach((doc) => {
     // console.log(doc.id, " => ", doc.data())

      setSliderList(sliderList => [...sliderList,doc.data()])
    });
  }

  const getCatagoryList = async() => {
    setCatagoryList([]);
      const querySnapShot = await getDocs(collection(db, "Catagory"));
      querySnapShot.forEach((doc) => {
       // console.log("Docs:",doc.data())
        setRefreshing(false)
        setCatagoryList(catagoryList => [...catagoryList, doc.data()]);
      })
    }



    /*
    const getLatestItems = async() => {

      
      const first = db.collection('cities')
  .orderBy('population')
  .limit(3);

const snapshot = await first.get();

// Get the last document
const last = snapshot.docs[snapshot.docs.length - 1];

// Construct a new query starting at this document.
// Note: this will not have the desired effect if multiple
// cities have the exact same population value.
const next = db.collection('cities')
  .orderBy('population')
  .startAfter(last.data().population)
  .limit(3);


  const querySnapshots = await getDocs(collection(db, 'FurnitureData'));
      setLatestItemLists([]);
      querySnapshots.forEach((doc) => {
        doc.data().values.id = doc.id;
        const productWithId =  doc.data()
        productWithId.values.id = doc.id;
        
        setRefreshing(false)
        setLatestItemLists(latestItemLists => [...latestItemLists, productWithId]);
        
      const first = db.collection('cities')
  .orderBy('population')
  .limit(3);

const snapshot = await first.get();

// Get the last document
const last = snapshot.docs[snapshot.docs.length - 1];

// Construct a new query starting at this document.
// Note: this will not have the desired effect if multiple
// cities have the exact same population value.
const next = db.collection('cities')
  .orderBy('population')
  .startAfter(last.data().population)
  .limit(3);



      
     // console.log("listitm:", latestItemLists)
    });
  }
    */
    //old 
    /*
    setRefreshing(true)
     
      const querySnapshots = await getDocs(collection(db, 'FurnitureData'));
      setLatestItemLists([]);
      querySnapshots.forEach((doc) => {
        doc.data().values.id = doc.id;
        const productWithId =  doc.data()
        productWithId.values.id = doc.id;
        
        setRefreshing(false)
        setLatestItemLists(latestItemLists => [...latestItemLists, productWithId]);
        */

  
        const getLatestItems = async() => {
            // Adjust based on your needs
            const q = query(collection(db, 'FurnitureData'), limit(pageSize));
            // const q = query(collection(db, 'ProductDataTest'), limit(pageSize));
            const querySnapshot = await getDocs(q);

            setRefreshing(true);
            setLatestItemLists([]);

            querySnapshot.forEach((doc) => {
            doc.data().values.id = doc.id;
            // console.log("latestItemList",doc.data() )
            const productWithId = doc.data();
            productWithId.values.id = doc.id;
            setLatestItemLists(latestItemLists => [...latestItemLists, productWithId]);
            });
            console.log("latestItemLists", latestItemLists )
            
            setPreviosStart(querySnapshot.docs[(querySnapshot.docs.length - 1)-querySnapshot.docs.length]);
            setStartingDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
           
            setRefreshing(false);
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



    const handleOnCatagoryChanged = (item: string) => {
      setSelectedCategory(item); 
      console.log("selected catagory: ",item)
      if(item == "All"){  getLatestItems(); return;}
      else {navigation.navigate('itemlist',{item: item});}
    }
    
  
  const onSelect = () =>{
    console.log("selected catagory: ",selectedCategory);
  }
//FFFBFC
  return(
  
   
    <LinearGradient colors={['#FDF0F3', 'transparent']} style={styles.container}>
    <SafeAreaView >
   
        {/* navigation bar */}
        <NavBar title="Furniture " showBack ={false} showSearch = {true}/>
        
         {/* horizontal catagory */}
        <View style={styles.categoriesContainer}>
 

          {
          /*
          <CategoryTabs
            selectedCategory={selectedCategory}
            onSelect={category => { console.log("selected catagory: ",selectedCategory); setSelectedCategory(category); }}
          />
           */
          }
          {/* horizontal catagory */}
          <FlatList 
                data={catagoryList} 
                renderItem={({item,index}) =>(
                  //MyComponent is to mean that for catagoryView file
                <MyComponent 
                  item={item.value}
                  key={index}
                  selectedCategory={selectedCategory}
                  onSelect={item => {handleOnCatagoryChanged(item)}}
                />
              )} 
              keyExtractor={item => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
            />
        </View>
        
         
        
          <FlatList 
             numColumns={2}
             ListHeaderComponent={
             <>
            <ItemsCarousel sliderList={sliderList}/>
            <View style={{marginTop: 15, marginHorizontal: 18,}}>
              <Text style={{fontSize: 20, fontWeight: "bold", marginBottom: 25,}}>Latest Items</Text>
            </View>
            </>
            }
            data={latestItemLists} 
            renderItem={({item ,index}) => (
              // <Text>Product list</Text>
                 <ProductCards 
                    item={item.values}
                    key={index}
                    />
            )} 
           
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
                  {/* <Offers /> */}
              </View>
   
            }
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={ getLatestItems} />
            }
          />

  </SafeAreaView>
  </LinearGradient>
 
  )
}




const Home = () => {
 
  return(
  <Layout />
  )
       
};

export default Home;




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  categoriesContainer: {
    marginTop: 10,
    marginBottom: 20,
  },
  scrollInnerContainer: {
    paddingBottom: 70,
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
