import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from "expo-secure-store";

import HomeScreen from "./screens/HomeScreen";
import ShowScreen from "./screens/ShowScreen";
import Login from "./screens/Login"
import MyRatingScreen from "./screens/MyRatingScreen"

export default function App() {

  const AuthStack = createStackNavigator();
  const [allBreweries, setAllBreweries] = useState([])
  const [allRatings, setAllRatings] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    SecureStore.getItemAsync("token")
      .then(data => {
        const token = data
        if (token) {
          const reqObj = {
            method: 'GET',
            headers: {
              "Authorization": `Bearer ${token}`
            }
          }
          fetch('http://localhost:3000/users', reqObj)
            .then(resp => resp.json())
            .then(data => {
              setAllBreweries(data.breweries)
              setAllRatings(data.ratings)
              setUser(data.user)
            })
            .catch(err => console.log(err))
        }
      })
  }, [])

  console.log(user)
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Login" component={Login} initialParams={{ user: user }} />
        <AuthStack.Screen name="HomeScreen" component={HomeScreen} initialParams={{}} />
        <AuthStack.Screen name="ShowScreen" component={ShowScreen} initialParams={{ user: user, ratings: allRatings }} />
        <AuthStack.Screen name="MyRatingScreen" component={MyRatingScreen} initialParams={{ user: user, ratings: allRatings, breweries: allBreweries }} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
