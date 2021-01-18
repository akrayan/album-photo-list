import React from 'react'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'

import Dimensions from "../constants/Dimensions";
import Container from '../components/Container'
import { capitalizeString } from '../helper';

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: "bold"
    },
    image: {
        width: Dimensions.window.width,
        aspectRatio: 1
    },
});

function DetailsScreen({ route }) {
    const { id, title, url } = route.params;

    return (
        <Container flex stretch>
            <ScrollView>
                <Image

                    style={styles.image}
                    source={{ uri: url }}
                    //resizeMode="contain"
                    onError={({ nativeEvent: { error } }) => console.log("err deital", error)}
                />
                <Container flex stretch padding>
                    <Text style={styles.title}>{capitalizeString(title)}</Text>
                </Container>
            </ScrollView>
        </Container>)
}

export default DetailsScreen;