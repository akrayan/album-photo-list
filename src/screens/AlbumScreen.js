import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, Button, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'

import Container from '../components/Container'
import { getPhotosActionRequest } from "../store/ActionRequest";
import { albumsSelector, loadingPhotosSelector } from "../store/Selectors";

function navToDetails(navigation, photo) {
    navigation.navigate("Details", photo);
}

function PhotoItem({ navigation, photo }) {
    return (
        <TouchableOpacity onPress={() => navToDetails(navigation, photo)} >
            <Image style={{ width: 100, height: 100 }} source={{ uri: photo.url }} onError={({ nativeEvent: { error } }) => console.log("err photo", error)} />
        </TouchableOpacity>
    );
}

function AlbumView({ navigation, loading, onRefresh, photoList }) {
    return (
        <Container flex stretch>
            <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
                <Container flex stretch padding>
                    <Text>Album</Text>
                    {photoList.length > 0 ?
                        <View>{photoList.map(photo => {
                            return (
                                <PhotoItem key={photo.id} navigation={navigation} photo={photo} />)
                        })}
                        </View>
                        : <Text>No Photos</Text>}
                </Container>
            </ScrollView>
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