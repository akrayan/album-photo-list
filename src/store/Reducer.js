
const initialState = {
    loading: false,
    albumList: [],
    albumSelected: null,
    error: null
  };
  
  export const ALBUMS_GET = "albums/get";

  
  export function albumsReducer(state = initialState, action) {
    switch (action.type) {
      case ALBUMS_GET:
        return { ...state, albumList: action.payload, loading: false };
      default:
        return state;
    }
  }