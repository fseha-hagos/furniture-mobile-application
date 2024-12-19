import {
    Image,
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    SafeAreaView,
    FlatList,
    RefreshControl,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  
  import { FontAwesome } from '@expo/vector-icons';
 
import NavBar from '../components/navbar';

import { useNavigation, useRoute } from '@react-navigation/native';
import CartCard from '../components/cartCard';
import { useAuth } from '../context/cartContext';
import MyComponent from '../components/catagoryView';
import {Linking} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';


  
  const itemd = {
    name: 'Sebastian \nchairs',
    price: 349.99,
    image: require('./assets/images/chair-transparent.png'),
    color: '#F7F7F7',
    isNew: true,
    isLiked: true,
    rating: 4,
    colors: ['black', 'pink', 'red'],
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  };
  
 
 
  const Cart = ({route} :any) => {
  
   
    const {carts, totalPrice, deleteFromCart} = useAuth();
    const [refreshing, setRefreshing] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const onRefresh = async () => {
      setRefreshing(true);
      // Fetch new data here (API call, etc.)
      // Update your component's state with the new data
      setRefreshing(false);
    };
    useEffect(()=>{
      setShowAlert(false)
    },[])

   
    const callHandler = () =>{

      const args = {
        number: '9093900003', // String value with the number to call
        prompt: false, // Optional boolean property. Determines if the user should be prompted prior to the call 
        skipCanOpen: true // Skip the canOpenURL check
      }
      
    //  call(args).catch(console.error)
    }
    
  const handleOnTelegram = async () => {
    const linkk = 'https://t.me/+251962588731/'
      Linking.openURL(linkk)
  }

    return (
      
      <SafeAreaView style={styles.container}>
        <NavBar title="My Cart" showBack={true} showSearch={false} />
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh}>
          <FlatList 
          data={carts}
          renderItem={({item}) =>
            <CartCard
          item={item}
          deleteFromCart ={deleteFromCart}
              />
          } 
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 50
          }}
          ListFooterComponent={
            <>
             <View style={styles.divider} />  

<View style={styles.priceContainer}>
<View style={styles.priceAndTotal}>
<Text style={styles.priceText}>Total: </Text>
<Text style={styles.priceText}>Birr {totalPrice}</Text>
</View>
<View style={styles.priceAndTotal}>
<Text style={styles.priceText}>Shipping: </Text>
<Text style={styles.priceText}>Birr 0</Text>
</View>
<View style={styles.divider} />
<View style={styles.priceAndTotal}>
<Text style={styles.priceText}>Grand Total: </Text>
<Text style={[styles.priceText, {color: 'black', fontWeight: "500"}]}>Birr {totalPrice}</Text>
</View>
</View>

            </>
          }
          />
          </RefreshControl>
       <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => setShowAlert(true)} style={styles.button}>
          <Text style={styles.buttonText}>Get Cupen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={()=>{Linking.openURL('tel:+251948491265');}}>
            <Text style={styles.buttonText}>Call Us</Text>
          </TouchableOpacity>
        </View>
        
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="CN: 20000"
          message="20000 is your coupen number,  meet us with this copen on telegram or pay with our payment system methods!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          cancelText="telegram"
          confirmText="payment"
          cancelButtonColor='#00685C'
          confirmButtonColor="#00685C"
          onDismiss={() => {
            setShowAlert(false)
          }}
          onCancelPressed={() => {
            handleOnTelegram()
           //setShowAlert(false)

          }}
          onConfirmPressed={() => {
            setShowAlert(false)
          }}
          titleStyle={{color:"black"}}
        />
  
        </SafeAreaView>
    );
 
  };
  
  export default Cart;
  
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
      paddingBottom: 30,
    },

    buttonContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-evenly",
      alignItems: "center",
      marginHorizontal: 25,
      marginVertical: 15,
    },
    button: {
      alignItems: "center",
      backgroundColor: '#00685C',
      width: 140,
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 10,
    },
   
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: '500',
    },
    priceContainer : {
      paddingHorizontal: 15,
      flex: 1,
      marginTop: 30
    },
    priceAndTotal : {
      flexDirection: "row",
      justifyContent: "space-between",
      marginVertical: 10
    },
    priceText : {
      fontSize: 18,
      color: "#757575"
    },
    divider:{
      borderWidth: 1,
      borderColor: "#C0C0C0",
      marginTop: 10
    },
    contactContainer: {

    },
    contacts: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around"
    }
  });
  