//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Navbar from '../components/navbar';

// create a component
const Cupens = () => {
    return (
      
        <SafeAreaView style={styles.container}>
          <Navbar title="My Cupens" showSearch={false} showBack={true} />
         
       
          <View style={styles.mainContainer}><Text style={{fontSize: 20}}>404 page not found</Text></View>
          </SafeAreaView>
      );
   
    };
    
    export default Cupens;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 40,
        paddingBottom: 60,
      },
      mainContainer: {
        flex: 1,
        justifyContent:"center",
        alignItems: "center",
      }
    });
//make this component available to the app

