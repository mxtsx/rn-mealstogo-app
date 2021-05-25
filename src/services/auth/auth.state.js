import React, {useReducer} from 'react';
import {authReducer, clearError, setError, setIsAuth, setIsLoading, setUser} from "./auth.reducer";
import {AuthContext} from "./auth.context";
import firebase from "firebase";

export const AuthState = ({children}) => {
    const initialState = {
        user: null,
        isAuth: false,
        isLoading: false,
        error: null
    }
    const [state, dispatch] = useReducer(authReducer, initialState)

    const checkIsAuth = async () => {
        await firebase.auth().onAuthStateChanged((u) => {
            if (u) {
                dispatch(setIsLoading(true))
                dispatch(setUser(u))
                dispatch(setIsAuth(true))
                dispatch(setIsLoading(false))
            } else {
                dispatch(setIsAuth(false))
            }
        })
    }

    const onLogin = async (email, password) => {
        dispatch(clearError())
        try {
            const response = await firebase.auth().signInWithEmailAndPassword(email, password)
            dispatch(setUser(response?.user))
            if(response?.user) {
                dispatch(setIsAuth(true))
            }
        } catch (e) {
            dispatch(setError(e))
            console.log(e)
        }
    }

    const onRegister = async (email, password, repeatedPassword) => {
        dispatch(clearError())
        try {
            if (password !== repeatedPassword) {
                dispatch(setError({message: 'Passwords do not match'}))
            } else {
                const response = await firebase.auth().createUserWithEmailAndPassword(email, password)
                dispatch(setUser(response?.user))
                if(response?.user) {
                    dispatch(setIsAuth(true))
                }
            }
        } catch (e) {
            dispatch(setError(e))
            console.log(e)
        }
    }

    const logOut = async () => {
        await firebase.auth().signOut()
        dispatch(setUser(null))
        dispatch(setIsAuth(false))
    }

    return (
        <AuthContext.Provider value={{
            user: state.user,
            isAuth: state.isAuth,
            isLoading: state.isLoading,
            error: state.error,
            onLogin,
            onRegister,
            logOut,
            checkIsAuth
        }}>
            {children}
        </AuthContext.Provider>
    )
}