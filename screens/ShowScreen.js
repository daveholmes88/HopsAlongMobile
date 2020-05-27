import React from 'react';
import { View, Text } from 'react-native'

export default function ShowScreen({ route, navigation }) {

    console.log(route.params)
    return (
        <View>
            <Text>Hello World</Text>
        </View>
    )
}