import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
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
    console.log("-----------------------------");
    (async () => {
      console.log("++++++++++++++++++++++++");
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
      } else {
        console.log("not granted");
      }
    })();
  });

  console.log(location);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={location}
      />
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
    height: 450,
    width: 500,
  },
});
