import React from 'react'
import { View, Text } from 'react-native'

function DetailsScreen({route}) {
    const { id, title } = route.params;

    return (<View>
        <Text>Details</Text>
        <Text>id : {id}</Text>
        <Text>title : {title}</Text>
    </View>)
}

export default DetailsScreen;