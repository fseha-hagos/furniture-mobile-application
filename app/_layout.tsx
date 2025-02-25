import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';
import { ImageBackground, Text, View , StyleSheet} from 'react-native';
import Profile from './(auth)/profile';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './(auth)/home';
import Product from './(auth)/product';



const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;
// const Tab = createBottomTabNavigator();

const InitialLayout = () => {
 const { isLoaded, isSignedIn } = useAuth();
//  const { isLoaded, isSignedIn } = useAuth();
 
 
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!isLoaded) return;

    const inTabsGroup = segments[0] === '(auth)';

    console.log('User changed: ', isSignedIn);

    if (isSignedIn && !inTabsGroup) {
      router.replace('/home');
    } else if (!isSignedIn) {
      router.replace('/login');
    }
  }, [isSignedIn]);

  return (
    <Slot />
  );
};


// const InitialLayout = () => {

// //  const { isLoaded, isSignedIn } = useAuth();
 
 
//   const segments = useSegments();
//   const router = useRouter();

//   useEffect(() => {
//     if (!true) return;

//     const inTabsGroup = segments[0] === '(auth)';

//       router.replace('/home');
   
//   }, []);

//   return (
//     <Slot />
//   );
// };

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

    /*
     <ImageBackground style={styles.background} source={require("./src/assets/coffee_assets/americano/portrait/americano_pic_1_portrait.png")}>
     
       <View style={styles.loginBtn}><Text style={styles.loginTxt}>Login</Text></View>
       <View style={styles.loginBtn}><Text style={styles.loginTxt}>Sign In</Text></View>
     
   </ImageBackground>
   
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>
    <InitialLayout />
  </ClerkProvider>

    */
const RootLayout = () => {
  const router = useRouter();
  return (
   
//     <ImageBackground style={styles.background} source={require("./src/assets/coffee_assets/americano/portrait/americano_pic_1_portrait.png")}>
     
//     <View style={styles.loginBtn}><Text style={styles.loginTxt}>Login</Text></View>
//     <View style={styles.loginBtn}><Text style={styles.loginTxt}>Sign In</Text></View>
  
// </ImageBackground>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache}>  
      <InitialLayout />
    </ClerkProvider>
  );
};

const styles = StyleSheet.create({
  background : {
    flex: 1,
    justifyContent: "center",
  },

  loginBtn: {
    width: "100%",
    height: 70,
   
    justifyContent: "center",
    alignItems: "center",
   
    backgroundColor: "red",
    marginTop: 15,
    marginRight: 20,
    marginLeft: 20,
    borderLeftColor: "#000",
    borderRadius: 10,
  },
  loginTxt: {
   fontSize: 22,
   color: "#fff",
   fontWeight: 'bold'
  }
});

export default RootLayout;
