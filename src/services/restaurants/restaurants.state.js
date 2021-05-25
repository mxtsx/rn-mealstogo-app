import React, {useReducer} from 'react';
import {RestaurantsContext} from "./restaurants.context";
import {clearError, fetchData, restaurantsReducer, setError, setIsLoading} from "./restaurants.reducer";
import {restaurantsRequest} from "./api/restaurants.service";
import camelize from "camelize";

export const RestaurantsState = ({children}) => {
    const initialState = {
        restaurants: [],
        isLoading: false,
        error: null
    }
    const [state, dispatch] = useReducer(restaurantsReducer, initialState)

    const fetchRestaurants = async (location) => {
        dispatch(setIsLoading(true))
        dispatch(clearError())
        try {
            const response = await restaurantsRequest(location)
            const camelizeRes = camelize(response)
            dispatch(fetchData(camelizeRes.results))
        } catch (e) {
            console.log(e)
            dispatch(setError(e))
        } finally {
            setTimeout(() => {
                dispatch(setIsLoading(false))
            }, 300)
        }
    }

    return (
        <RestaurantsContext.Provider value={{
            restaurants: state.restaurants,
            isLoading: state.isLoading,
            error: state.error,
            fetchRestaurants
        }}>
            {children}
        </RestaurantsContext.Provider>
    )
}