import React from 'react'
import { View, Text, Image, ScrollView } from 'react-native'

import Container from '../components/Container'

function DetailsScreen({ route }) {
    const { id, title, url } = route.params;

    return (
        <Container flex stretch>
            <ScrollView>
                <Image
                    style={{ height: 600 }}
                    source={{ uri: url }}
                    onError={({ nativeEvent: { error } }) => console.log("err deital", error)}
                />
                <Container flex stretch padding>
                    <Text>Details</Text>
                    <Text>id : {id}</Text>
                    <Text>title : {title}</Text>
                </Container>
            </ScrollView>
        </Container>)
}

export default DetailsScreen;