import React, {useReducer} from 'react';
import {LocationContext} from "./location.context";
import {clearError, locationReducer, setError, setIsLoading, setLocation} from "./location.reducer";
import {locationRequest, locationTransform} from "./location.services";

export const LocationState = ({children}) => {
    const initialState = {
        location: {
            lat: 37.7749295,
            lng: -122.4194155,
            viewport: {
                northeast: { lat: 37.812, lng: -122.3482 },
                southwest: { lat: 37.70339999999999, lng: -122.527 },
            }
        },
        isLoading: false,
        error: null
    }
    const [state, dispatch] = useReducer(locationReducer, initialState)

    const search = async (keyword) => {
        dispatch(setIsLoading(true))
        dispatch(clearError())
        try {
            const response = await locationRequest(keyword)
            const {lat, lng, viewport} = locationTransform(response)
            dispatch(setLocation(lat, lng, viewport))
        } catch (e) {
            console.log(e)
            dispatch(setError(e))
        } finally {
            dispatch(setIsLoading(false))
        }
    }

    return (
        <LocationContext.Provider value={{
            location: state.location,
            isLoading: state.isLoading,
            error: state.error,
            keyword: state.keyword,
            search
        }}>
            {children}
        </LocationContext.Provider>
    )
}