import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'

function navToAlbum(navigation, album) {
    navigation.navigate("Album", album);
}

function HomeScreen({ navigation }) {
    return (<View>
        <Text>Home</Text>
        <Button title="go Album" onPress={() => navToAlbum(navigation, { id: 0, title: "lorem" })} />
    </View>)
}

export default HomeScreen;