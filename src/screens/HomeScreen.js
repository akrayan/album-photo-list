import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView, RefreshControl, StyleSheet } from 'react-native'

import Container from '../components/Container'
import { albumsSelector, loadingAlbumsSelector } from "../store/Selectors";
import { getAlbumsActionRequest } from "../store/ActionRequest";
import Dimensions from "../constants/Dimensions";
import { colors } from "../constants/Colors";

const itemWidth = ((Dimensions.window.width - 20) / 2) - 10; // Half width - pading - margin
const itemHeigth = itemWidth * 1.8;

const colorList = [colors.orange, colors.blue, colors.green, colors.skyblue, colors.red, colors.purple]

const styles = StyleSheet.create({ 
    albumItem : {
        justifyContent: 'flex-end',
        height : itemHeigth,
        width : itemWidth,
        borderColor: 'dimgrey',
        borderWidth: 1,
        borderRadius: 10,
        margin: 5,
    },
    albumTitle : {
        marginLeft: 10,
        marginBottom: 10,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'capitalize'
    }
});

function navToAlbum(navigation, album) {
    navigation.navigate("Album", album);
}

function AlbumItem({ navigation, album }) {
    return (
            <TouchableOpacity style={{...styles.albumItem, backgroundColor: colorList[album.id % colorList.length]}} onPress={() => navToAlbum(navigation, album)}>
                <Text style={styles.albumTitle} numberOfLines={1}>{album.title}</Text>
            </TouchableOpacity>
    );
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