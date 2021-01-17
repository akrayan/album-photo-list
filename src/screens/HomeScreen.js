import React, { useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { View, Text, Button, TouchableOpacity } from 'react-native'


import { albumsSelector } from "../store/Selectors";

function navToAlbum(navigation, album) {
    navigation.navigate("Album", album);
}

function HomeView({ navigation, albumList }) {
    return (<View>
        <Text>Home</Text>
        {
            albumList?.length > 0 ?
                <View>{albumList.map(album => <Text key={album.id}>{album.title} </Text>)}</View>
                : <Text>No Album</Text>
        }
        <Button title="go Album" onPress={() => navToAlbum(navigation, { id: 0, title: "lorem" })} />
    </View>)
}

function HomeScreen({ navigation }) {
    const albumList = useSelector(albumsSelector);
    return (<HomeView navigation={navigation} albumList={albumList}/>)
}

export default HomeScreen;