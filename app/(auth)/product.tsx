import { Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    Touchable,
    TouchableHighlight,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  
  import { FontAwesome, Ionicons } from '@expo/vector-icons';
 
import NavBar from '../components/navbar';

import { NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../context/cartContext';
import { Route } from 'expo-router/build/Route';
import {myProductsFromDatabasePeopsWithId} from '../context/constants'
  
 
  

interface ProductStackParamList {
  Cart: { item: null }; // Assuming Cart is defined elsewhere
}
     
type item = string
  
 
  const Product = ({ route }: any) => {
    const router = useRoute();
    
    const navigation = useNavigation<NavigationProp<ProductStackParamList>>();
    const {carts,onAddToCart,refreshCart,deleteFromCart} = useAuth();
    const [color, setColor] = useState(null);
    const [total, setTotal] = useState(1);

  
    const itemss  = route.params?.item;
   console.log("routers:", router.params)
  // const t = itemss.totalPurchase
   

    const [activeColorIndex, setActiveColorIndex] = React.useState(0);

    useEffect(() => {
     if(itemss.totalPurchase) setTotal(itemss.totalPurchase)
     // handleOnTotalPurchase
    },[route])

   const  handleAddToCart = (itemss:myProductsFromDatabasePeopsWithId) =>{
    itemss.color = itemss.colors[activeColorIndex];
    itemss.totalPurchase = total;
    onAddToCart!(itemss)
    refreshCart!()
    setTotal(1)
    navigation.navigate('Cart',{item: null});
  }

    
  const handleOnTotalPurchase = (t :number) => {
    if(t >= 1){
      setTotal(t)
    }
    refreshCart!()
  }

  if (itemss) {
    return (
      
      <SafeAreaView style={styles.container}>
        <NavBar title="Product" showBack={true} showSearch={false}/>
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollInnerContainer}>
          <Image source={{uri: itemss.image}} style={styles.image} />
          <View style={styles.contentContainer}>
            <View style={styles.detailsRow}>
              <Text style={styles.productName}>{itemss.title}</Text>
              <Text style={styles.productPrice}>${itemss.price}</Text>
            </View>
            <View style={styles.ratingRow}>
              {Array.from({ length: itemss.rating }).map((_, index) => (
                <FontAwesome
                  name="star"
                  size={20}
                  color="black"
                  style={styles.starIcon}
                  key={index}
                />
              ))}
            </View>
            <View style={styles.deliveryContainer}>
              <View style={[{flexDirection: 'row', alignItems: 'center'},styles.deliveryText]}>
              <Ionicons name="location-outline" size={24} color="black" /> 
              <Text>Mekelle</Text>
              </View>
             
              <Text style={styles.deliveryText}>free delivery</Text>
            </View>
         {/*//////////////////*/ }  
            <View style={{flexDirection: 'row', justifyContent:'space-between', }}>

            
            <View>
              <Text style={styles.colorTitle}>which color is best for you?</Text>
              <View style={styles.colorsRow}>
                {itemss.colors.map((color: string , i: number) => (
                  <TouchableOpacity
                    onPress={() => setActiveColorIndex(i)}
                    style={[
                      styles.colorContainer,
                      activeColorIndex === i && styles.activeColorContainer,
                    ]}>
                    <View style={[styles.colorDot, { backgroundColor: color }]} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.totalContainer}>
            <TouchableOpacity onPress={() => handleOnTotalPurchase(Number(total)+1) }> 
              <Text style={styles.totalNavigator}>+</Text>  
            </TouchableOpacity> 
            <Text style={styles.totalText}>{total}</Text> 
            <TouchableOpacity onPress={() => handleOnTotalPurchase(Number(total)-1)}> 
              <Text style={styles.totalNavigator}>-</Text>  
            </TouchableOpacity> 
            </View>

            </View>
       {/*//////////////////*/ }
            <Text style={styles.description}>{itemss.desc}</Text>
           
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => handleAddToCart(itemss)}>
            <Image
              source={require('./assets/images/shopping-bag.png')}
              style={styles.shoppingBagIcon}
              resizeMode="contain"
            />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        </SafeAreaView>
    );
  } else {
    console.log("there is problem in product.tsx of rendering items 119")
  }
   
  };
  
  export default Product;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      
      paddingBottom: 60,
    },
    image: {
      marginTop: 20,
      marginBottom: 10,
      width: '90%',
      height: 'auto',
      aspectRatio: 3 / 2,
      alignSelf: 'center',
    },
    scrollContainer: {
      flex: 1,
    },
    scrollInnerContainer: {
      paddingBottom: 30,
    },
    contentContainer: {
      paddingHorizontal: 25,
    },
    deliveryContainer : {
      flexDirection : 'row',
      justifyContent: 'space-between',
      backgroundColor: 'gray',
      borderRadius: 20,
      marginBottom: 5
    },
    deliveryText : {
      paddingHorizontal:7,
      fontSize: 14
    },
    productName: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'black',
    },
    detailsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },
    productPrice: {
      fontSize: 20,
      fontWeight: 'bold',
      color: 'black',
    },
    ratingRow: {
      marginTop: 5,
      marginBottom: 20,
      flexDirection: 'row',
    },
    starIcon: {
      marginRight: 5,
    },
    colorTitle: {
      fontSize: 13,
      color: 'gray',
      fontWeight: 'bold',
      marginBottom: 10,
      marginTop: 15
    },
    colorsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      width: "85%",
      flexWrap: 'wrap'
    },
    colorContainer: {
      marginRight: 12,
    },
    activeColorContainer: {
      padding: 3,
      backgroundColor: 'white',
      borderRadius: 16,
      elevation: 2,
    },
    colorDot: {
      width: 26,
      height: 26,
      borderRadius: 13,
    },
    description: {
      fontSize: 13,
      fontWeight: '500',
      marginVertical: 24,
      color: '#3F3F3F',
      lineHeight: 25,
    },
    buttonContainer: {
      marginHorizontal: 25,
      marginVertical: 15,
    },
    button: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'black',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 50,
    },
    shoppingBagIcon: {
      width: 12,
      height: 17,
      tintColor: 'white',
      marginRight: 15,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
    },
    totalContainer : {
      flexDirection: 'row',
      gap: 8,
      marginTop: 15
    },
    totalText : {

    },
    totalNavigator : {

      borderWidth: 1,
      textAlign: 'center',
      paddingVertical: 2,
      width: 25,
      height: 25,
      borderRadius: 14,
      fontWeight: '800'
      
    }
   
  });
  