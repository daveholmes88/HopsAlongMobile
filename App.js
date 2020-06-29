import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import * as SecureStore from "expo-secure-store";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';


import HomeScreen from "./screens/HomeScreen";
import ShowScreen from "./screens/ShowScreen";
import Login from "./screens/Login";
import MyRatingScreen from "./screens/MyRatingScreen";
import SearchScreen from "./screens/SearchScreen"

export default function App() {

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const [allBreweries, setAllBreweries] = useState([])
  const [allRatings, setAllRatings] = useState([])
  const [user, setUser] = useState({})
  console.log(user)

  useEffect(() => {
    SecureStore.getItemAsync("token")
      .then(data => {
        console.log(data)
        const token = data
        if (token) {
          userFetch(token)
        } else {
          breweryFetch()
        }
      })
  }, [])

  breweryFetch = () => {
    fetch('https://tranquil-earth-85240.herokuapp.com/breweries')
      .then(resp => resp.json())
      .then(data => {
        setAllBreweries(data.breweries),
          setAllRatings(data.ratings)
      })
      .catch(err => console.log(err))
  }

  userFetch = (token) => {
    console.log('++++++++++++++++++++++++')
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

  createHomeStack = () => {
    return <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        initialParams={{ user: user, ratings: allRatings }}
        options={{ headerStyle: { backgroundColor: '#FFC108' } }} />
      <Stack.Screen
        name='HomeScreen'
        component={HomeScreen}
        initialParams={{ user: user, ratings: allRatings }}
        options={{
          title: 'Near Me',
          headerStyle: { backgroundColor: '#FFC108' }
        }} />
      <Stack.Screen
        name='ShowScreen'
        component={ShowScreen}
        initialParams={{ user: user, ratings: allRatings }}
        options={{
          title: 'Brewery',
          headerStyle: { backgroundColor: '#FFC108' }
        }} />
    </Stack.Navigator>
  }

  createRatingStack = () => {
    return <Stack.Navigator>
      <Stack.Screen
        name='MyRatingScreen'
        component={MyRatingScreen}
        initialParams={{ user: user, ratings: allRatings, breweries: allBreweries }}
        options={{
          title: 'My Breweries',
          headerStyle: { backgroundColor: '#FFC108' }
        }} />
      <Stack.Screen
        name='ShowScreen'
        component={ShowScreen}
        initialParams={{ user: user, ratings: allRatings }}
        options={{
          title: 'Brewery',
          headerStyle: { backgroundColor: '#FFC108' }
        }} />
    </Stack.Navigator>
  }

  createSearchStack = () => {
    return <Stack.Navigator>
      <Stack.Screen
        name='SearchScreen'
        component={SearchScreen}
        initialParams={{ breweries: allBreweries }}
        options={{ headerStyle: { backgroundColor: '#FFC108' } }} />
      <Stack.Screen
        name='ShowScreen'
        component={ShowScreen}
        initialParams={{ user: user, ratings: allRatings }}
        options={{
          title: 'Brewery',
          headerStyle: { backgroundColor: '#FFC108' }
        }} />
    </Stack.Navigator>
  }

  return (
    <NavigationContainer>
      <Tab.Navigator
        activeColor='#FFC108'
        inactiveColor='#FFC108'
        tabBarOptions={{ style: { backgroundColor: '#FFC108' } }}>
        <Tab.Screen name="Home" children={createHomeStack} style={{ backgroundColor: '#FFC108' }} />
        <Tab.Screen name="Rating" children={createRatingStack} />
        <Tab.Screen name="Search" children={createSearchStack} />
      </Tab.Navigator>
    </NavigationContainer >
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




