const SET_LOCATION = 'location/SET_LOCATION'
const SET_IS_LOADING = 'location/SET_IS_LOADING'
const SET_ERROR = 'location/SET_ERROR'
const CLEAR_ERROR = 'location/CLEAR_ERROR'

export const locationReducer = (state, action) => {
    switch (action.type) {
        case SET_LOCATION:
            return {
                ...state,
                location: action.payload.location
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

export const setLocation = (lat, lng, viewport) => ({type: SET_LOCATION, payload: {location: {lat, lng, viewport}}})
export const setIsLoading = (isLoading) => ({type: SET_IS_LOADING, payload: {isLoading}})
export const setError = (err) => ({type: SET_ERROR, payload: {err}})
export const clearError = () => ({type: CLEAR_ERROR})