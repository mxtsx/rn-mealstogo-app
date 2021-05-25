import React, {useReducer} from 'react';
import {addOrder, deleteOrder, makeOrder, ordersReducer, resetCart, setIsLoading} from "./orders.reducer";
import {OrdersContext} from "./orders.context";

export const OrdersState = ({children}) => {
    const initialState = {
        cart: {
            restaurants: [],
            details: [],
            totalPrice: null,
        },
        orders: [],
        isAuth: false,
        isLoading: false,
        error: null
    }
    const [state, dispatch] = useReducer(ordersReducer, initialState)

    const addToCart = (restaurant, description, price) => {
        dispatch(setIsLoading(true))
        dispatch(addOrder(restaurant, description, price))
        dispatch(setIsLoading(false))
    }

    const removeOrder = (orderId) => {
        dispatch(deleteOrder(orderId))
    }

    const checkout = (order) => {
        dispatch(makeOrder(order))
        dispatch(resetCart())
    }

    return (
        <OrdersContext.Provider value={{
            cart: state.cart,
            orders: state.orders,
            isAuth: state.isAuth,
            isLoading: state.isLoading,
            error: state.error,
            addToCart,
            removeOrder,
            checkout
        }}>
            {children}
        </OrdersContext.Provider>
    )
}