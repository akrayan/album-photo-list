import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'

function DetailsScreen({ route }) {
    const { id, title, url } = route.params;

    return (<ScrollView>
        <Image
            style={{height: 600}}
            source={{uri: url}}
            onError={({ nativeEvent: {error} }) => console.error("err deital", url, error)}
        />
        <Text>Details</Text>
        <Text>id : {id}</Text>
        <Text>title : {title}</Text>
    </ScrollView>)
}

export default DetailsScreen;