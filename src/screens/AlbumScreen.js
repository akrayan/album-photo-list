import React from 'react'
import { View, Text, Button, TouchableOpacity } from 'react-native'


function navToDetails(navigation, pic) {
    navigation.navigate("Details", pic);
}

function PhotoItem({navigation, photo}) {
    return (<TouchableOpacity onPress={() => navToDetails(navigation, photo)} ><Image style={{widht: 100, height: 100}} source={{uri: photo.url}}/></TouchableOpacity>);
}

function AlbumView({navigation, photoList}) {
    return (<View>
        <Text>Album</Text>
        {photoList.length > 0 ? <View>{photoList.map(photo => <PhotoItem key={photo.id} navigation={navigation} photo={photo}/>)}</View> : <Text>No Photos</Text>}
        <Button title="go details" onPress={() => navToDetails(navigation, { id: 76, title: "ipsum" })} />
    </View>)
}

function AlbumScreen({ route, navigation }) {
    const { id, title } = route.params;
    const albumList = useSelector(albumsSelector);
    const photoList = albumList.find(album => album.id == id).photos ?? [];
    return (<AlbumView navigation={navigation} photoList={photoList}/>)
}

export default AlbumScreen;