const FETCH_FAVOURITES = 'favourites/FETCH_FAVOURITES'
const SET_FAVOURITES = 'favourites/SET_FAVOURITES'
const REMOVE_FAVOURITES = 'favourites/REMOVE_FAVOURITES'
const SET_IS_LOADING = 'favourites/SET_IS_LOADING'
const SET_ERROR = 'favourites/SET_ERROR'
const CLEAR_ERROR = 'favourites/CLEAR_ERROR'

export const favouritesReducer = (state, action) => {
    switch (action.type) {
        case FETCH_FAVOURITES:
            return {
                ...state,
                favourites: [...action.payload.favourites]
            }
        case SET_FAVOURITES:
            return {
                ...state,
                favourites: [...state.favourites, action.payload.favourite]
            }
        case REMOVE_FAVOURITES:
            return {
                ...state,
                favourites: state.favourites.filter(f => f.placeId !== action.payload.placeId)
            }
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: action.payload.isLoading
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload.err
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export const fetchFavourites = (favourites) => ({type: FETCH_FAVOURITES, payload: {favourites}})
export const setFavourite = (favourite) => ({type: SET_FAVOURITES, payload: {favourite}})
export const removeFavourite = (placeId) => ({type: REMOVE_FAVOURITES, payload: {placeId}})
export const setIsLoading = (isLoading) => ({type: SET_IS_LOADING, payload: {isLoading}})
export const setError = (err) => ({type: SET_ERROR, payload: {err}})
export const clearError = () => ({type: CLEAR_ERROR})