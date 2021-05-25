const SET_USER = 'auth/SET_USER'
const SET_IS_AUTH = 'auth/SET_IS_AUTH'
const SET_IS_LOADING = 'auth/SET_IS_LOADING'
const SET_ERROR = 'auth/SET_ERROR'
const CLEAR_ERROR = 'auth/CLEAR_ERROR'

export const authReducer = (state, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                user: action.payload.user
            }
        case SET_IS_AUTH:
            return {
                ...state,
                isAuth: action.payload.isAuth
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

export const setUser = (user) => ({type: SET_USER, payload: {user}})
export const setIsAuth = (isAuth) => ({type: SET_IS_AUTH, payload: {isAuth}})
export const setIsLoading = (isLoading) => ({type: SET_IS_LOADING, payload: {isLoading}})
export const setError = (err) => ({type: SET_ERROR, payload: {err}})
export const clearError = () => ({type: CLEAR_ERROR})