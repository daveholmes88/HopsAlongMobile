import React, { useState } from "react";
import { View, Text, Button, ScrollView, StyleSheet, TextInput } from 'react-native';


export default function HomeScreen({ navigation, route }) {
    return (
        <View style={styles.container}>
            <Text>Hello World</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
})
