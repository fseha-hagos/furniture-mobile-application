import React from 'react';
import { Stack } from 'expo-router';
import { Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const PublicLayout = () => {
  const navigation = useNavigation();
  return (
    <Stack

      screenOptions={{
        headerShown: true,
        headerTintColor: "#fffff0",
          headerStyle: {
            backgroundColor: '#00685C'
          },
      
       
      }}>
        <Stack.Screen
        name="logoutHomeScreen"
        options={{
          headerShown: false
        }}></Stack.Screen>
        <Stack.Screen
        name="keyboardavoidtest"
        options={{
          headerShown: false
        }}></Stack.Screen>
      <Stack.Screen
        name="login"
        options={{
          headerTitle: 'Sign in',
        }}></Stack.Screen>
      <Stack.Screen
        name="register"
        options={{
          headerTitle: 'Create Account',
        }}></Stack.Screen>
      <Stack.Screen
        name="reset"
        options={{
          headerTitle: 'Reset Password',
        }}></Stack.Screen>
    </Stack>
  );
};

export default PublicLayout;
