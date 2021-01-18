import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView, RefreshControl } from 'react-native'

import Container from '../components/Container'
import { albumsSelector, loadingAlbumsSelector } from "../store/Selectors";
import { getAlbumsActionRequest } from "../store/ActionRequest";

function navToAlbum(navigation, album) {
    navigation.navigate("Album", album);
}

function AlbumItem({ navigation, album }) {
    return (<TouchableOpacity onPress={() => {
        //onSelect(album.id);
        navToAlbum(navigation, album);
    }}><Text>{album.title}</Text></TouchableOpacity>);
}

function HomeView({ navigation, onRefresh, loading, albumList }) {
    return (
        <Container flex stretch>
            <ScrollView refreshControl={<RefreshControl refreshing={loading} onRefresh={onRefresh} />}>
                <Container flex stretch padding>
                    <Text>Home</Text>
                    {
                        albumList?.length > 0 ?
                            <View>{albumList.map(album => <AlbumItem key={album.id} navigation={navigation} album={album} />)}</View>
                            : <Text>No Album</Text>
                    }
                </Container>
            </ScrollView>
        </Container>
    )
}

function HomeScreen({ navigation }) {
    const albumList = useSelector(albumsSelector);
    const loading = useSelector(loadingAlbumsSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        if (albumList?.length == 0)
            dispatch(getAlbumsActionRequest())
    }, [dispatch])
    const onRefresh = useCallback(() => {
        dispatch(getAlbumsActionRequest())
    }, []);
    return (<HomeView navigation={navigation} onRefresh={onRefresh} loading={loading} albumList={albumList} />)
}

export default HomeScreen;