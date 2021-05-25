import React, {useContext, useEffect, useReducer} from 'react';
import {
    clearError,
    favouritesReducer, fetchFavourites,
    removeFavourite,
    setError,
    setFavourite,
    setIsLoading
} from "./favourites.reducer";
import {FavouritesContext} from "./favourites.context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {AuthContext} from "../auth/auth.context";

export const FavouritesState = ({children}) => {
    const {user} = useContext(AuthContext)
    const initialState = {
        favourites: [],
        isLoading: false,
        error: null
    }
    const [state, dispatch] = useReducer(favouritesReducer, initialState)

    const saveFavourites = async (value, uid) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem(`@favourites-${uid}`, jsonValue)
        } catch (e) {
            dispatch(setError(e))
            console.log(e)
        }
    }


    const loadFavourites = async (uid) => {
        try {
            const value = await AsyncStorage.getItem(`@favourites-${uid}`)
            if (value !== null) {
                const parsedValue = JSON.parse(value)
                dispatch(fetchFavourites(parsedValue))
            }
        } catch (e) {
            dispatch(setError(e))
            console.log(e)
        }
    }

    const addFavourite = async (restaurant) => {
        dispatch(setIsLoading(true))
        dispatch(clearError())
        try {
            dispatch(setFavourite(restaurant))
        } catch (e) {
            dispatch(setError(e))
        } finally {
            setTimeout(() => {
                dispatch(setIsLoading(false))
            }, 300)
        }
    }

    const deleteFavourite = async (placeId) => {
        dispatch(setIsLoading(true))
        dispatch(clearError())
        try {
            dispatch(removeFavourite(placeId))
        } catch (e) {
            console.log(e)
            dispatch(setError(e))
        } finally {
            setTimeout(() => {
                dispatch(setIsLoading(false))
            }, 300)
        }
    }

    useEffect(() => {
        if(user) {
            loadFavourites(user.uid)
        }
    }, [user])

    useEffect(() => {
        if(user) {
            saveFavourites(state.favourites, user.uid)
        }
    }, [state.favourites, user])

    return (
        <FavouritesContext.Provider value={{
            favourites: state.favourites,
            isLoading: state.isLoading,
            error: state.error,
            addFavourite,
            deleteFavourite
        }}>
            {children}
        </FavouritesContext.Provider>
    )
}