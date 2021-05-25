import {mockImages} from "./mock";

const FETCH_DATA = 'restaurants/FETCH_DATA'
const SET_IS_LOADING = 'restaurants/SET_IS_LOADING'
const SET_ERROR = 'restaurants/SET_ERROR'
const CLEAR_ERROR = 'restaurants/CLEAR_ERROR'

export const restaurantsReducer = (state, action) => {
    switch (action.type) {
        case FETCH_DATA:
            const updatedData = action.payload.restaurants.map(r => {
                return {
                    ...r,
                    isOpenNow: r.openingHours?.openNow,
                    isClosedTemporarily: r.businessStatus === 'CLOSED_TEMPORARILY',
                    photos: mockImages[Math.ceil(Math.random() * (mockImages.length - 1))]
                }
            })
            return {
                ...state,
                restaurants: updatedData
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
};

export const fetchData = (restaurants) => ({type: FETCH_DATA, payload: {restaurants}})
export const setIsLoading = (isLoading) => ({type: SET_IS_LOADING, payload: {isLoading}})
export const setError = (err) => ({type: SET_ERROR, payload: {err}})
export const clearError = () => ({type: CLEAR_ERROR})