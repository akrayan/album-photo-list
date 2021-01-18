import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, Button, TouchableOpacity, ScrollView, RefreshControl, FlatList, StyleSheet } from 'react-native'

import Container from '../components/Container'
import Dimensions from "../constants/Dimensions";
import { getPhotosActionRequest } from "../store/ActionRequest";
import { albumsSelector, loadingPhotosSelector } from "../store/Selectors";

const itemWidth = ((Dimensions.window.width - 20) / 2) - 10; // Half width - pading - margin

const styles = StyleSheet.create({
    photoItem: {
        borderRadius: 5,
        margin: 5,
    },
    photo: {
        width: itemWidth,
        aspectRatio: 1,
        borderRadius: 5
    },
    gridList: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'flex-start',
    }
});

function navToDetails(navigation, photo) {
    navigation.navigate("Details", photo);
}

function PhotoItem({ navigation, photo }) {
    return (
        <TouchableOpacity style={styles.photoItem} onPress={() => navToDetails(navigation, photo)} >
            <Image style={styles.photo} source={{ uri: photo.url }} onError={({ nativeEvent: { error } }) => console.log("err photo", error)} />
        </TouchableOpacity>
    );
}

function AlbumView({ navigation, loading, onRefresh, photoList }) {
    return (
        <Container flex stretch>
            <FlatList
                contentContainerStyle={styles.gridList}
                refreshing={loading}
                onRefresh={onRefresh}
                data={photoList}
                numColumns={2}
                renderItem={({ item }) => PhotoItem({ navigation: navigation, photo: item })}
                keyExtractor={(item) => item.id}
            />

        </Container >
    )
}

function AlbumScreen({ route, navigation }) {
    const { id, title } = route.params;
    const albumList = useSelector(albumsSelector);
    const loading = useSelector(loadingPhotosSelector)
    const photoList = albumList.find(album => album.id == id).photos ?? [];
    const dispatch = useDispatch();
    useEffect(() => {
        if (photoList.length == 0)
            dispatch(getPhotosActionRequest(id))
    }, [dispatch])
    const onRefresh = useCallback(() => {
        dispatch(getPhotosActionRequest())
    }, []);
    return (<AlbumView navigation={navigation} loading={loading} onRefresh={onRefresh} photoList={photoList} />)
}

export default AlbumScreen;