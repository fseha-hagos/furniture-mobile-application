import { View, Text, Button, TextInput, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity, Linking, Touchable, Pressable } from 'react-native';
import { useState } from 'react';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import Navbar from '../components/navbar';
import Login from '../(public)/login';
import { Ionicons } from '@expo/vector-icons';


interface ProductStackParamList {
  addpost : {item: null }; // Assuming Product is defined elsewhere
}

const Profile = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const navigation = useNavigation<NavigationProp<ProductStackParamList>>();

  const ProfileMenu = [
    {
      id: 1,
      name: "My Favorites",
      path: "Favorites",
      icon: <Ionicons name="heart-sharp" size={16} color="white" style={styles.shoppingBagIcon}/>
    },
    {
      id : 2,
      name: "My Cupen",
      path: "cupens",
      icon: <Image
      source={require('./assets/images/shopping-bag.png')}
      style={styles.shoppingBagIcon}
     resizeMode="contain"
     />
    },
    {
      id : 3,
      name: "Clear Catch",
      path: "clear",
      icon: <Image
      source={require('./assets/images/shopping-bag.png')}
      style={styles.shoppingBagIcon}
     resizeMode="contain"
     />
    },
    {
      id : 4,
      name: "Terms and Conditions",
      path: "terms",
      icon: <Image
      source={require('./assets/images/shopping-bag.png')}
      style={styles.shoppingBagIcon}
     resizeMode="contain"
     />
    },
    {
      id : 5,
      name: "Add Product",
      path: "addProduct",
      icon: <Image
      source={require('./assets/images/shopping-bag.png')}
      style={styles.shoppingBagIcon}
     resizeMode="contain"
     />
    },
  ]

  const onSaveUser = async () => {
    try {
      // This is not working!
      const result = await user?.update({
        firstName: 'John',
        lastName: 'Doe',
      });
      console.log('🚀 ~ file: profile.tsx:16 ~ onSaveUser ~ result:', result);
    } catch (e) {
      console.log('🚀 ~ file: profile.tsx:18 ~ onSaveUser ~ e', JSON.stringify(e));
    }
  };

  const handleOnMenuPressed = (path: string) =>{
    console.log(path);

    if(path === "clear"){
      console.log("clear all catch");
    }
    else{
      try{
        navigation.navigate(path,{item: null})
      }catch(error){
        console.log(error)
      }
      
    }
    
  }
  const call = async () => {
    Linking.openURL('tel:+251948491265');
  }
  const telegram = async () => {
    const linkk = 'https://t.me/+251962588731/'
      Linking.openURL(linkk)
  }
  const facebook = async () => {
    const linkk = 'https://facebook.com/'
      Linking.openURL(linkk)
  }
  const insta = async () => {
    const linkk = 'https://t.me/+251962588731/'
      Linking.openURL(linkk)
  }
  const tiktok = async () => {
    const linkk = 'https://t.me/+251962588731/'
      Linking.openURL(linkk)
  }
  return (
    <SafeAreaView style={styles.scrollContainer}>
      <Navbar title="Profile " showBack ={true} showSearch = {false}/>
      <View style={styles.container}>

      
      <View style={styles.profileContainer}>
        <Image source={require("../assets/logo/kb-furniture-high-resolution-logo-transparent.png")} style={styles.profileImg}/>
        <Text style={{fontWeight: 'bold', color:"white"}} onPress={call}>+251948491265</Text>
        <View style={styles.contactContainer} >
          <TouchableOpacity style={styles.contactIcons} onPress={facebook}>
           <Image source={require("../assets/logo/fb.png")} style={styles.icon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactIcons} onPress={telegram}>
           <Image source={require("../assets/logo/telegram.png")} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactIcons} onPress={insta}>
           <Image source={require("../assets/logo/insta.png")} style={styles.icon}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactIcons} onPress={tiktok}>
           <Image source={require("../assets/logo/google.png")} style={styles.icon}/>
          </TouchableOpacity>
         
        </View>
      </View>

    
       <View style={[{marginTop: 40, width: "100%"},styles.menuContainer]}>
          { 
            ProfileMenu.map((menu, index) => (
              <View key={index} style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => {handleOnMenuPressed(menu.path)}}>
                    {menu.icon}
                     <Text style={styles.buttonText}>{menu.name}</Text>
                 </TouchableOpacity>
              </View>
            ))  
          }
         </View>
         </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer : {
    flex: 1,
  },
  container : {
    alignItems: 'center'
   
  },
  contactContainer :{
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
    alignItems:"center",
    marginTop: 5,
    gap: 14
  },
  contactIcons : {
    width: 40,
    height:40,
    
  },
  icon : {
    width: 40,
    height:40,
    resizeMode: "cover"
  },
  profileContainer: {
    width: "98%",
    borderRadius: 10,
    height: 190,
   backgroundColor: "#00685C",
    marginTop: 3,
    alignItems: 'center',
    justifyContent: "center",
    elevation: 30,
    shadowColor: 'black',
    shadowOffset: {width: 3, height: -6},
   
  },
  profileImg : {
    resizeMode:"contain",
    height: 80,
    marginBottom:10
  },
  user : {

  },
  menuContainer : {
   
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center"
  },
  buttonContainer: {
    paddingHorizontal: 5,
    marginTop: 15,
    width: "95%"
  },
  button: {
    
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#00685C',
    paddingVertical: 13,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  shoppingBagIcon: {
    width: 16,
    height: 17,
    tintColor: 'white',
    color: "white",
    marginRight: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  
});

export default Profile;
