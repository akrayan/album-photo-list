import { ALBUMS_GET, STORE_ERROR } from './Reducer'
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