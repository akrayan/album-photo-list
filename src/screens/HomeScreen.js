import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, TouchableOpacity } from 'react-native'

import { albumsSelector } from "../store/Selectors";
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

function HomeView({ navigation, albumList }) {
    return (<View>
        <Text>Home</Text>
        {
            albumList?.length > 0 ?
                <View>{albumList.map(album => <AlbumItem key={album.id} navigation={navigation} album={album} />)}</View>
                : <Text>No Album</Text>
        }
        <Button title="go Album" onPress={() => navToAlbum(navigation, { id: 0, title: "lorem" })} />
    </View>)
}

function HomeScreen({ navigation }) {
    const albumList = useSelector(albumsSelector);
    const dispatch = useDispatch();
    useEffect(() => {
        if (albumList?.length == 0)
            dispatch(getAlbumsActionRequest())
    }, [dispatch])
    return (<HomeView navigation={navigation} albumList={albumList}/>)
}

export default HomeScreen;