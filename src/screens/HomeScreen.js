import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, TouchableOpacity, ScrollView, RefreshControl, StyleSheet, FlatList } from 'react-native'

import Container from '../components/Container'
import CustomList from '../components/CustomList'
import { albumsSelector, loadingAlbumsSelector } from "../store/Selectors";
import { getAlbumsActionRequest } from "../store/ActionRequest";
import Dimensions from "../constants/Dimensions";
import { colors } from "../constants/Colors";

const itemWidth = ((Dimensions.window.width - 20) / 2) - 10; // Half width - pading - margin
const itemHeigth = itemWidth * 1.5;

const colorList = [colors.orange, colors.blue, colors.green, colors.skyblue, colors.red, colors.purple]

const styles = StyleSheet.create({
    albumItem: {
        justifyContent: 'flex-end',
        height: itemHeigth,
        width: itemWidth,
        borderColor: 'white',
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
    },
    albumTitle: {
        marginLeft: 15,
        marginBottom: 20,
        marginRight: 5,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'capitalize'
    },
    gridList: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'flex-start',
    }
});

function navToAlbum(navigation, album) {
    navigation.navigate("Album", album);
}

function AlbumItem({ otherData, item }) {
    let navigation = otherData;
    let album = item;
    return (
        <TouchableOpacity style={{ ...styles.albumItem, backgroundColor: colorList[album.id % colorList.length] }} onPress={() => navToAlbum(navigation, album)}>
            <Text style={styles.albumTitle} numberOfLines={1}>{album.title}</Text>
        </TouchableOpacity>
    );
}


function HomeView({ navigation, onRefresh, loading, albumList }) {
    return (
        <Container flex stretch>
            <FlatList
                contentContainerStyle={styles.gridList}
                refreshing={loading}
                onRefresh={onRefresh}
                data={albumList}
                numColumns={2}
                renderItem={({ item }) => AlbumItem({ otherData: navigation, item: item })}
                keyExtractor={(item) => item.id}
            />
            {/* 
            <CustomList
                refreshing={loading}
                onRefresh={onRefresh}
                data={albumList}
                otherData={navigation}
                renderItem={AlbumItem}
                renderEmpty={() => <Text>No Album</Text>}
                keyExtractor={(item) => item.id}
            />
            */}
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