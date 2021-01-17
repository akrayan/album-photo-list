
const initialState = {
  loading: false,
  albumList: [],
  albumSelected: null,
  error: null
};

export const ALBUMS_GET = "albums/get";
export const PHOTOS_GET = "photos/get";
export const STORE_ERROR = "store/error";

export function albumsReducer(state = initialState, action) {
  switch (action.type) {
    case ALBUMS_GET:
      return { ...state, albumList: action.payload, loading: false };
    case STORE_ERROR:
      console.error("STR ERR:", action.payload)
      return { ...state, error: action.payload };
    default:
      return state;
  }
}