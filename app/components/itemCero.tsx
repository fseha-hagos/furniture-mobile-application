import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, Image, TouchableOpacity, FlatList, } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';
import { Pagination } from 'react-native-snap-carousel';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';
import Product from '../(auth)/product';
import { DocumentData, collection, getDoc, getDocs } from 'firebase/firestore';
import { db } from '@/firebaseConfig';
//import { useNavigation, useRouter } from 'expo-router';


interface listProp{
  sliderList: DocumentData[]
}

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

interface props {
  item: productType
}

interface ProductStackParamList {
  Product: { item: productType }; // Assuming Product is defined elsewhere
}



const sampleProduct = [

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


const ItemsCarousel = ({sliderList}: listProp) => {
  const [activeDotIndex, setActiveDotIndex] = React.useState(0);
  const { width } = useWindowDimensions();
  const [isLiked, setIsliked] = useState(false);
  const navigation = useNavigation<NavigationProp<ProductStackParamList>>();
  

  const DotElement = ({ active }: any) => (
    <View style={[styles.dotContainer, active && styles.activeDotContainer]}>
      <View style={[styles.dot, active && styles.activeDot]}></View>
    </View>
  );

  
  
  const handleLiked = () => {
    
    setIsliked(!isLiked);
    console.log(isLiked);
  }
  
  const renderItem = ({item}: props) => {
    setIsliked(item.isLiked);
  
    return (
      <TouchableOpacity
         onPress={() => navigation.navigate("Product", { item })}
        
        style={[styles.item, { backgroundColor: item.color }]}>
        <View style={styles.itemHeader}>
       
          {item.isNew ? <Text style={styles.headerText}>New</Text> : <View />}
          <TouchableOpacity onPress={() => item.isLiked = !item.isLiked}>
         
          {item.isLiked  ? 
          <FontAwesome name="heart" size={20} color="#E55B5B" /> :
          <Entypo name="heart-outlined" size={24} color="black" />}
         
          </TouchableOpacity>
        </View>
        <Image source={item.image} style={styles.itemImage} />
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </TouchableOpacity>
    );
  };

  //console.log("sliderList : ", sliderList);
  return (
    <View style={styles.container}>
      {
        /*
<Carousel
        activeSlideAlignment="start"
        data={sampleProduct}
        renderItem={renderItem}
        sliderWidth={width}
        itemWidth={width * 0.56}
        inactiveSlideScale={0.72}
        onSnapToItem={index => setActiveDotIndex(index)}
      />
      <Pagination
        activeDotIndex={activeDotIndex}
        dotsLength={sampleProduct.length}
        dotElement={<DotElement active={true} />}
        inactiveDotElement={<DotElement active={false} />}
      />
        */
      }
      
      <FlatList
      
       data={sliderList}
       horizontal={true}
       renderItem={({item, index})=>(
        <View style={{marginHorizontal: 5, borderRadius: 10}}>
          <Image source={{uri: item.image}} style={{height:200, width:280, borderRadius: 10}}/> 
          </View>
          )}
          keyExtractor={item => item.id}
      />
    </View>
  );
};





export default ItemsCarousel;





const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 25,
  },
  item: {
    padding: 15,
    borderRadius: 15,
  },
  title: {
    color: 'black',
    fontSize: 18,
    fontWeight: '500',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  headerText: {
    fontSize: 12,
  },
  itemImage: {
    width: '100%',
    height: 'auto',
    aspectRatio: 4 / 3,
    alignSelf: 'center',
    marginBottom: 10,
  },
  dot: {
    backgroundColor: '#CACACA',
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  activeDot: {
    backgroundColor: '#000000',
  },
  dotContainer: {
    marginHorizontal: 7,
  },
  activeDotContainer: {
    padding: 4,
    backgroundColor: '#909090',
    borderRadius: 10,
  },
  price: {
    fontSize: 13,
    fontWeight: '500',
    color: '#ACB1BE',
    marginTop: 3,
  },
});
