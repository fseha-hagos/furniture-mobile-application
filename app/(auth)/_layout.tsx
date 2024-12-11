import React, {useEffect} from 'react';
import {NavigationContainer, NavigationIndependentTree} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNavigator from '../navigators/TabNavigator';
import Home from './home';
import Product from './product';
import Cart from './cart';
import {AuthProvider, useAuth } from '../context/cartContext';
import AddPostScreen from './addPostScreen';
import ItemList from './itemList';


const Stack = createNativeStackNavigator();

const Layout = () => {
  useEffect(() => {
   // SplashScreen.hide();
  }, []);

  
  return (
    
    <AuthProvider>
   <Navigations />
    </AuthProvider>
    
  );
};

const Navigations = () => {
//////////////////////////////////////
  const {carts} = useAuth();
  //onLogin!("fseha", "password");
  console.log(carts);
  //console.log("carts counted: " + carts?.counted);
/////////////////////////////////////////////////////

return(
  <NavigationIndependentTree >
      <TabNavigator />
      
  </NavigationIndependentTree>

)
}

export default Layout;
