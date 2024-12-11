

import {useContext, createContext, useEffect, useState} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import {myProductsFromDatabasePeopsWithId, myProductsFromDatabaseProps} from '../context/constants'




interface AuthProps {
    totalPrice?: number,
    carts?: myProductsFromDatabasePeopsWithId[],
    onAddToCart?: (item: myProductsFromDatabasePeopsWithId) => Promise<void | any>;
    deleteFromCart?: (item: myProductsFromDatabasePeopsWithId) => Promise<void | any>;
    handleLiked?:  (item: myProductsFromDatabaseProps) => Promise<void | any>;
    refreshCart?: () => Promise<void | any>;
    likedProducts?: myProductsFromDatabaseProps[];
}

//const TOKEN_KEY = 'my-jwt';
//export const API_URL = 'https://api.developbetterapps.com';
const AuthContext = createContext<AuthProps>({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children}: any)=>{

    const [carts, setCarts] = useState<myProductsFromDatabasePeopsWithId[]>([])
    const [totalPrice, setTotalPrice] = useState(0);
    const [likedProducts, setLikedProducts] = useState<myProductsFromDatabaseProps[]>([])

    useEffect(() => {
       
        totalSum(carts);
        loadCartItems();
        loadLikedItems();
    },[totalPrice])

    const loadCartItems = async () => {
        let getCarts = await AsyncStorage.getItem("carts");
         let savedCarts = getCarts ? JSON.parse(getCarts) : [];
        setCarts(savedCarts)
        totalSum(savedCarts)
        console.log("getCarts : ",getCarts)
    }
    const loadLikedItems = async () => {
        let getLiked = await AsyncStorage.getItem("liked-products");
        let savedLikes = getLiked ? JSON.parse(getLiked) : [];
        setLikedProducts(savedLikes);
    }

    const totalSum = (carts: myProductsFromDatabasePeopsWithId[]) => {
        const totalSum = carts.reduce((accumulator, item) => accumulator + (Number(item.price)*Number(item.totalPurchase)), 0);
        setTotalPrice(totalSum);
        console.log(totalSum)
      //  const totalSum ()=  carts.reduce((ammount, item) => ammount+ item.price , 0);
    }

    const handleLiked = async (items: myProductsFromDatabaseProps) => { 
         
         const isLiked = likedProducts.some((liked) => liked.id === items.id);
         
         if (isLiked) {
            const newItems = likedProducts.filter((liked) => liked.id !== items.id) ;
            await AsyncStorage.setItem("liked-products", JSON.stringify(newItems));
            setLikedProducts(newItems);
          } else {
            const dislike =  [...likedProducts, items]
            await AsyncStorage.setItem("liked-products", JSON.stringify(dislike));
            setLikedProducts(dislike);
          }      
          console.log("context liked products: ",likedProducts)
          return Promise.resolve();
      }
   
     
    const deleteFromCart = async (item: myProductsFromDatabasePeopsWithId) => {
        const newItems = carts.filter((cart) => cart.id !== item.id) ;
        await AsyncStorage.setItem("carts", JSON.stringify(newItems));
        setCarts(newItems)
        totalSum(newItems);
    }
    const refreshCart = async () => {
        loadCartItems();
        loadLikedItems();
    }

    const onAddToCart = async (item: myProductsFromDatabasePeopsWithId) => {
        const itemExists = carts.findIndex((cart) => cart.id === item.id);
        if(itemExists !== -1){
            const updatedCarts = [...carts];
            updatedCarts[itemExists].totalPurchase = (item.totalPurchase); // Add 1 to quantity
            updatedCarts[itemExists].color = (item.color ); // Add 1 to quantity

      await AsyncStorage.setItem("carts", JSON.stringify(updatedCarts));
      setCarts(updatedCarts);
      totalSum(updatedCarts);
        }
       else{
        const newCarts = [...carts , item]
        await AsyncStorage.setItem("carts",JSON.stringify(newCarts))
       setCarts(newCarts);
       totalSum(newCarts)
       }
        
console.log(" item--------- : ",item)
       // return Promise.resolve();
    }

    const value = {
        totalPrice,
        carts,
        onAddToCart,
        deleteFromCart,
        likedProducts,
        handleLiked,
        refreshCart,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
}


