import React from 'react'
import { View, Text, Button } from 'react-native'


function navToDetails(navigation, pic) {
    navigation.navigate("Details", pic);
}

function AlbumScreen({ route, navigation }) {
    const { id, title } = route.params;

    return (<View>
        <Text>Album</Text>
        <Text>id : {id}</Text>
        <Text>title : {title}</Text>
        <Button title="go details" onPress={() => navToDetails(navigation, { id: 76, title: "ipsum" })} />
    </View>)
}

export default AlbumScreen;