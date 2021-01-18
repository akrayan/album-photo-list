
const initialState = {
  loadingAlbums: false,
  loadingPhotos: false,
  albumList: [],
  albumSelected: null,
  error: null
};

export const GET_ALBUMS = "albums/get";
export const GET_PHOTOS = "photos/get";
export const GET_ALBUMS_SUCCESS = "albums/get/success";
export const GET_PHOTOS_SUCCESS = "photos/get/success";
export const STORE_ERROR = "store/error";

export function albumsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALBUMS:
      console.log("refresh albums")
      return { ...state, loadingAlbums: true };
    case GET_ALBUMS_SUCCESS:
      console.log("get albums success", action.payload.length)
      return { ...state, albumList: action.payload, loadingAlbums: false };
    case GET_PHOTOS:
      console.log("refresh photos")
      return { ...state, loadingPhotos: true };
    case GET_PHOTOS_SUCCESS:
      console.log("get photos success", action.payload.photos.length)
      return {
        ...state, albumList: state.albumList.map(album => {
          if (action.payload.id == album.id)
            return { ...album, photos: [...action.payload.photos] }
          else
            return album;
        }), loadingPhotos: false
      };
    case STORE_ERROR:
      console.error("STR ERR:", action.payload)
      return { ...state, error: action.payload, loadingAlbums: false, loadingPhotos: false };
    default:
      return state;
  }
}