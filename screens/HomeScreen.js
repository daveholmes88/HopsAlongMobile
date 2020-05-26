import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Card } from 'react-native-elements';
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function HomeScreen() {
  const [location, setLocation] = useState({
    latitude: 37,
    longitude: -122,
    latitudeDelta: 0.09,
    longitudeDelta: 0.045,
  });
  const [breweries, setBreweries] = useState([]);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status === "granted") {
        let position = await Location.getCurrentPositionAsync({
          enableHighAccuracy: true,
        });
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.09,
          longitudeDelta: 0.045,
        });
        const newLocation = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            location: [latitude, longitude]
          })
        }
        fetch('http://localhost:3000/descriptions', newLocation)
          .then(resp => resp.json())
          .then(data => setBreweries(data.breweries))
          .catch(err => console.log(err))
      } else {
        console.log("not granted");
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={location}
      />
      <View style={styles.breweryCard}>
        <Card><Text>Hello Worldasdgafdsgsagasdgsagsgd</Text></Card>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  map: {
    height: '50%',
    width: '100%',
    position: 'absolute'
  },
  breweryCard: {
    alignItems: 'center',
    height: 500,
    width: '100%',
    top: '50%'
  }
});
