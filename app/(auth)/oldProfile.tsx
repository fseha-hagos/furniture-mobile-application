import { View, Text, Button, TextInput, StyleSheet, Image, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { useClerk, useUser } from '@clerk/clerk-expo';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '@react-navigation/native';
import Navbar from '../components/navbar';
import Login from '../(public)/login';


interface ProductStackParamList {
  addpost : {item: null }; // Assuming Product is defined elsewhere
}

const OldProfle = () => {
  const { signOut } = useClerk();
  const { user } = useUser();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const navigation = useNavigation<NavigationProp<ProductStackParamList>>();

  const ProfileMenu = [
    {
      id: 1,
      name: "ADD POST",
      path: "addpost"
    },
    {
      id : 2,
      name: "DELETE POST",
      path: "addpost"
    },
    {
      id : 3,
      name: "LOGOUT",
      path: "addpost"
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

  return (
    <SafeAreaView style={styles.scrollContainer}>
      <Navbar title="Profile " showBack ={true} showSearch = {false}/>
      <View style={styles.container}>

      
      <View style={styles.profileContainer}>
        <Image source={{uri: (user?.imageUrl ? user?.imageUrl : "../assets/images/logo/profile.webp")}} style={styles.profileImg}/>
        <Text style={{fontWeight: 'bold', color:"white"}}>{user?.fullName}</Text>
        <Text style={{color: 'gray'}}>{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>

    
       <View style={[{marginTop: 40, width: "100%"},styles.menuContainer]}>
          { 
            ProfileMenu.map((menu, index) => (
              <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={() => {navigation.navigate(menu.path,{item: null})}}>
                    <Image
                      source={require('./assets/images/shopping-bag.png')}
                      style={styles.shoppingBagIcon}
                     resizeMode="contain"
                     />
                     <Text style={styles.buttonText}>{menu.name}</Text>
                 </TouchableOpacity>
              </View>
            ))


            
          }
          <View style={styles.buttonContainer}>
                  <TouchableOpacity style={styles.button} onPress={ () => signOut({redirectUrl: '../(public)/login'})}>
                    <Image
                      source={require('./assets/images/shopping-bag.png')}
                      style={styles.shoppingBagIcon}
                      resizeMode="contain"
                     />
                     <Text style={styles.buttonText}>Logout </Text> 
                 </TouchableOpacity>
              </View>
          
         </View>
         </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContainer : {
    flex: 1,
    marginTop: 40,
   
  },
  container : {
    alignItems: 'center'
   
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
    width: 100,
    height: 100,
    borderRadius: 60,
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
    width: 12,
    height: 17,
    tintColor: 'white',
    marginRight: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
  
});

export default OldProfle;
