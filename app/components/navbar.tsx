


import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/cartContext';

interface myprops{
  title: string;
  showBack: boolean;
  showSearch: boolean;
}

interface ProductStackParamList {
  Cart: { item: null }; // Assuming Cart is defined elsewhere
}

const Navbar = ({ title, showBack = false, showSearch = false } :myprops) => {

  const {carts} = useAuth();
  const navigation = useNavigation<NavigationProp<ProductStackParamList>>();

  const handleMyCart = () => {
    navigation.navigate("Cart",{item: null})
  }
  return (
    <View>
    <View style={styles.navBar}>
      {showBack ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Image
            source={require("../assets/logo/kb-furniture-high-resolution-logo-transparent.png")}
            style={styles.menuIcon}
            resizeMode='contain'
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity onPress={handleMyCart}>
        <View style={styles.shoppingBagContainer}>

        <Image
          source={require("../assets/images/shopping-bag.png")}
          style={styles.shoppingBagIcon}
          resizeMode="contain"
        />
          <View style={styles.shoppingTextContainer}>
              <Text style={styles.shoppingText}>{carts?.length}</Text>
           </View>
        </View>
      </TouchableOpacity>
    </View>
    {
      showSearch ? ( <View style={styles.searchContainer}>
        <Ionicons name="search" size={24} color="gray" style={{marginRight: 10}} />
        <TextInput placeholder='search' style={{fontSize: 18}} onChangeText={(value) => console.log(value)}/>
        </View>) :
        (<View/>)
    }
   
    </View>
  );
};

export default Navbar;


// define your styles
const styles = StyleSheet.create({
  menuIcon: {
    width: 130,
    height: 50,
    color: "white"
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 5,
    backgroundColor: "#00685C",
    height: 60
  },
  searchContainer : {
    flexDirection: 'row',
    backgroundColor: '#0000005',
    margin: 10,
    marginHorizontal: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: '#00000050',
    borderRadius: 25
    
  },
  shoppingBagContainer : {
    position: "relative",
    display: "flex",

  },
  shoppingBagIcon: {
    width: 19,
    height: 24,
    color: "white"
  },
  shoppingTextContainer : {
   position: "absolute",
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    width:15,
    height: 15,
    top: -10,
    left: -3,
     
    
  },
  shoppingText : {
    color: "white",
    fontSize: 10,
    fontWeight: "500"
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
  },
});

//make this component available to the app

