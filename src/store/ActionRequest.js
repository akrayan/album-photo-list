import { ALBUMS_GET, PHOTOS_GET, STORE_ERROR } from './Reducer'
import axios from 'axios'

export const getAlbumsActionRequest = () => async dispatch => {
    
    try{
        const res = await axios.get("http://jsonplaceholder.typicode.com/albums");
        dispatch( {
            type: ALBUMS_GET,
            payload: res.data
        })
    }
    catch(error){
        dispatch( {
            type: STORE_ERROR,
            payload: error,
        })
    }
}

export const getPhotosActionRequest = (id) => async dispatch => {
    try{
        const res = await axios.get("https://jsonplaceholder.typicode.com/photos?albumId=" + id);
        dispatch( {
            type: PHOTOS_GET,
            payload: {id: id, photos: res.data}
        })
    }
    catch(error){
        console.log("err", error)
        dispatch( {
            type: STORE_ERROR,
            payload: error,
        })
    }

}