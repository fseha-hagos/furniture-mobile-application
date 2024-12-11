/*
import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { StatusBar } from 'react-native';
import Home from './home';
import Search from './search';
import Favorites from './favorites';
import Profile from './profile';
import product from './product';


const RootStack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Text>text</Text>
    </SafeAreaProvider>
  );
};

const RootStackScreens = () => (
  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="HomeTabs" component={HomeTabs} />
    <RootStack.Screen name="Product" component={product} />
  </RootStack.Navigator>
);

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color }) => {
          return <TabIcon name={route.name} focused={focused} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#C7C6CC',
      })}>
      
     
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const TabIcon = ({ name , focused, color }:any) => {
  const icon = getIcon(name, focused);
  return icon;
};

const getIcon = (name:string, focused:string) => {
  switch (name) {
    case 'Home':
      return focused ? <Ionicons name="home-sharp" size={24} color="black" /> : <Ionicons name="home-outline" size={24} color="black" />;
    case 'Search':
      return focused ? <Ionicons name="search-sharp" size={24} color="black" /> : <Ionicons name="search-outline" size={24} color="black" />;
    case 'Favorites':
      return focused ? <Ionicons name="heart-sharp" size={24} color="black" /> : <Ionicons name="heart-outline" size={24} color="black" />;
    case 'Profile':
      return focused ? <Ionicons name="person-circle" size={24} color="black" /> : <Ionicons name="person-circle-outline" size={24} color="black" />;
    default:
      return <Ionicons name="help-sharp" size={24} color="black" />;
  }
};

const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    position: 'absolute',
  },
});

export default App;


*/

/*

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, StyleSheet } from 'react-native';
import { useAuth } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
import Home from './home';
import Product from './product';
import Search from './search';
import Favorites from './favorites';
import Profile from './profile';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

/*

  <RootStack.Navigator screenOptions={{ headerShown: false }}>
    <RootStack.Screen name="HomeTabs" component={HomeTabs} />
    
  </RootStack.Navigator>

<NavigationContainer>
<HomeTabs />
</NavigationContainer>

export const LogoutButton = () => {
  const { signOut } = useAuth();

  const doLogout = () => {
    signOut();
  };

  return (
    <Pressable onPress={doLogout} style={{ marginRight: 10 }}>
      <Ionicons name="log-out-outline" size={24} color={'#fff'} />
    </Pressable>
  );
};

const TabsPage = () => {
  const { isSignedIn } = useAuth();

  return (
    <HomeTabs />
  );
};


const HomeStacks = () =>{
  return (

  <Stack.Navigator 
  screenOptions={{headerShown: false}}>

      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Product" component={Product} />
  </Stack.Navigator>
  )
}
  


const HomeTabs = () => {
  return (
    <NavigationContainer independent={true}>
    <Tab.Navigator
       
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color }) => {
          return <TabIcon name={route.name} focused={focused} color={color} />;
        },
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#C7C6CC',
      })}>
      
     
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Product" component={Product} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Favorites" component={Favorites} />
      <Tab.Screen name="Profile" component={Profile} />
      
    </Tab.Navigator>
    </NavigationContainer>
  );
};

const TabIcon = ({ name , focused, color }:any) => {
  const icon = getIcon(name, focused);
  return icon;
};

const getIcon = (name:string, focused:string) => {
  switch (name) {
    case 'Home':
      return focused ? <Ionicons name="home-sharp" size={24} color="black" /> : <Ionicons name="home-outline" size={24} color="black" />;
    case 'Product':
      return focused ? <Ionicons name="home-sharp" size={24} color="black" /> : <Ionicons name="home-outline" size={24} color="black" />;
    case 'Search':
      return focused ? <Ionicons name="search-sharp" size={24} color="black" /> : <Ionicons name="search-outline" size={24} color="black" />;
    case 'Favorites':
      return focused ? <Ionicons name="heart-sharp" size={24} color="black" /> : <Ionicons name="heart-outline" size={24} color="black" />;
    case 'Profile':
      return focused ? <Ionicons name="person-circle" size={24} color="black" /> : <Ionicons name="person-circle-outline" size={24} color="black" />;
    default:
      return <Ionicons name="help-sharp" size={24} color="black" />;
  }
};
export default TabsPage;


const styles = StyleSheet.create({
  tabBarStyle: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: 70,
    position: 'absolute',
  },
});



<FlatList numColumns={2}
   data={[1,2,3,4,5,6]}
   renderItem={ProductCards}/>

*/

/*

import { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Platform,
} from "react-native";
import { Uploading } from "../components/Uploading";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { DocumentData, addDoc, collection, getDocs, onSnapshot } from "firebase/firestore";
import { db, storage } from "../../firebaseConfig";
import { Video } from "expo-av";
import { UploadingAndroid } from "../components/UploadingAndroid";


export default function Home() {
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");
  const [progress, setProgress] = useState(0);
  const [files, setFiles] = useState<DocumentData[]>([]);
 
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "files"), (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          console.log("New file", change.doc.data());
          setFiles((prevFiles) => [...prevFiles, change.doc.data()]);
        }
      });
    });
    return () => unsubscribe();
  }, []);


  
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // upload the image
      await uploadImage(result.assets[0].uri, "image");
    }
  }

  async function pickVideo() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      await uploadImage(result.assets[0].uri, "video");
    }
  }

  async function uploadImage(uri: string | URL | Request, fileType: string) {
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, "Stuff/" + new Date().getTime());
    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        setProgress(Number(progress.toFixed()));
      },
      (error) => {
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log("File available at", downloadURL);
          // save record
          await saveRecord(fileType, downloadURL, new Date().toISOString());
          setImage("");
          setVideo("");
        });
      }
    );
  }

  async function saveRecord(fileType: string, url: string, createdAt: string) {
    try {
      const docRef = await addDoc(collection(db, "files"), {
        fileType,
        url,
        createdAt,
      });
      console.log("document saved correctly", docRef.id);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={files}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => {
          if (item.fileType === "image") {
            return (
              <Image
                source={{ uri: item.url }}
                style={{ width: "34%", height: 100 }}
              />
            );
          } else {
            return (
              <Video
                source={{
                  uri: item.url,
                }}
                // videoStyle={{ borderWidth: 1, borderColor: "red" }}
                rate={1.0}
                volume={1.0}
                isMuted={false}
                //resizeMode="cover"
                shouldPlay
                // isLooping
                style={{ width: "34%", height: 100 }}
                useNativeControls
              />
            );
          }
        }}
        numColumns={3}
        contentContainerStyle={{ gap: 2 }}
        columnWrapperStyle={{ gap: 2 }}
      />
      {image &&
        (Platform.OS === "ios" ? (
          <Uploading image={image} video={video} progress={progress} />
        ) : (
          // Some features of blur are not available on Android
          <UploadingAndroid image={image} video={video} progress={progress} />
        ))}
      <TouchableOpacity
        onPress={pickImage}
        style={{
          position: "absolute",
          bottom: 90,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="image" size={24} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={pickVideo}
        style={{
          position: "absolute",
          bottom: 150,
          right: 30,
          width: 44,
          height: 44,
          backgroundColor: "black",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 25,
        }}
      >
        <Ionicons name="videocam" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}


*/