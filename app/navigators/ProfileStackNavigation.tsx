import { StyleSheet } from "react-native";
import AddPostScreen from "../(auth)/addPostScreen";
import Profile from "../(auth)/profile";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TermsAndConditions from "../(auth)/termsAndConditions";
import Cupens from "../(auth)/cupens";

// create a component
const ProfileStackNavigation = () => {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{headerShown: false}} >
        <Stack.Screen
          name="profile"
          component={Profile}
          ></Stack.Screen>
        <Stack.Screen
          name="addProduct"
          component={AddPostScreen}
          ></Stack.Screen>
          <Stack.Screen
          name="cupens"
          component={Cupens}
          ></Stack.Screen>
          <Stack.Screen
          name="terms"
          component={TermsAndConditions}
          ></Stack.Screen>
         
      </Stack.Navigator>
    );
};

export default ProfileStackNavigation;
// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});
