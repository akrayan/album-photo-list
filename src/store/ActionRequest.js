import { GET_ALBUMS_SUCCESS, GET_PHOTOS_SUCCESS, STORE_ERROR } from './Reducer'
import axios from 'axios'
import { getAlbumsAction, getPhotosAction } from './Action';

export const getAlbumsActionRequest = () => async dispatch => {
    dispatch(getAlbumsAction());
    try{
        const res = await axios.get("http://jsonplaceholder.typicode.com/albums");
        dispatch( {
            type: GET_ALBUMS_SUCCESS,
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
    dispatch(getPhotosAction);
    try{
        const res = await axios.get("https://jsonplaceholder.typicode.com/photos?albumId=" + id);
        dispatch( {
            type: GET_PHOTOS_SUCCESS,
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