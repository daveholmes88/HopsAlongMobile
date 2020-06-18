import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from "expo-secure-store";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from "./screens/HomeScreen";
import ShowScreen from "./screens/ShowScreen";
import Login from "./screens/Login";
import MyRatingScreen from "./screens/MyRatingScreen";
import SearchScreen from "./screens/SearchScreen"

export default function App() {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  const [allBreweries, setAllBreweries] = useState([])
  const [allRatings, setAllRatings] = useState([])
  const [user, setUser] = useState({})

  useEffect(() => {
    SecureStore.getItemAsync("token")
      .then(data => {
        const token = data
        console.log(data)
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

  createHomeStack = () => {
    return <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ user: user }} />
      <Stack.Screen name='HomeScreen' component={HomeScreen} initialParams={{ user: user, ratings: allRatings }} />
      <Stack.Screen name='ShowScreen' component={ShowScreen} initialParams={{ user: user, ratings: allRatings }} />
    </Stack.Navigator>
  }

  createRatingStack = () => {
    return <Stack.Navigator>
      <Stack.Screen name='MyRatingScreen' component={MyRatingScreen} initialParams={{ user: user, ratings: allRatings, breweries: allBreweries }} />
      <Stack.Screen name='ShowScreen' component={ShowScreen} initialParams={{ user: user, ratings: allRatings }} />
    </Stack.Navigator>
  }

  createSearchStack = () => {
    return <Stack.Navigator>
      <Stack.Screen name='SearchScreen' component={SearchScreen} initialParams={{ breweries: allBreweries }} />
      <Stack.Screen name='ShowScreen' component={ShowScreen} initialParams={{ user: user, ratings: allRatings }} />
    </Stack.Navigator>
  }

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" children={createHomeStack} />
        <Tab.Screen name="RatingScreen" children={createRatingStack} />
        <Tab.Screen name="SearchScreen" children={createSearchStack} />
      </Tab.Navigator>
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




