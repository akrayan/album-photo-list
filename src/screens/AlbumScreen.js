import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Image, Button, TouchableOpacity, ScrollView } from 'react-native'

import { getPhotosActionRequest } from "../store/ActionRequest";
import { albumsSelector } from "../store/Selectors";

function navToDetails(navigation, photo) {
    navigation.navigate("Details", photo);
}

function PhotoItem({ navigation, photo }) {
    return (
            <TouchableOpacity onPress={() => navToDetails(navigation, photo)} >
                <Image style={{ width: 100, height: 100 }} source={{ uri: photo.url }} onError={({ nativeEvent: {error} }) => console.error("err photo", photo, error)} />
            </TouchableOpacity>
     );
}

function AlbumView({ navigation, photoList }) {
    return (
        <ScrollView>
            <Text>Album</Text>
            {photoList.length > 0 ?
                <View>{photoList.map(photo => {
                    return (
                        <PhotoItem key={photo.id} navigation={navigation} photo={photo} />)
                })}
                </View>
                : <Text>No Photos</Text>}
            <Button title="go details" onPress={() => navToDetails(navigation, { id: 76, title: "ipsum" })} />
        </ScrollView>)
}

function AlbumScreen({ route, navigation }) {
    const { id, title } = route.params;
    const albumList = useSelector(albumsSelector);
    const photoList = albumList.find(album => album.id == id).photos ?? [];
    const dispatch = useDispatch();
    useEffect(() => {
        if (photoList.length == 0)
            dispatch(getPhotosActionRequest(id))
    }, [dispatch])

    return (<AlbumView navigation={navigation} photoList={photoList} />)
}

export default AlbumScreen;