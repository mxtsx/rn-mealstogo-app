import {capitalizeFirstLetter} from "../../utils/toUpperCase";

const ADD_ORDER = 'orders/ADD_ORDER'
const DELETE_ORDER = 'orders/DELETE_ORDER'
const MAKE_ORDER = 'orders/MAKE_ORDER'
const RESET_CART = 'orders/RESET_CART'
const SET_IS_LOADING = 'orders/SET_IS_LOADING'
const SET_ERROR = 'orders/SET_ERROR'
const CLEAR_ERROR = 'orders/CLEAR_ERROR'

export const ordersReducer = (state, action) => {
    switch (action.type) {
        case ADD_ORDER:
            const isOrdered = state.cart.restaurants.some(r => r.placeId === action.payload.restaurant.placeId)
            const id = new Date().toISOString()
            const restaurantWithOrderId = Object.assign(action.payload.restaurant, {orderId: id})
            const newOrder = {
                restaurant: action.payload.restaurant.name,
                orderId: id,
                description: capitalizeFirstLetter(action.payload.description),
                price: action.payload.price
            }
            return {
                ...state,
                cart: {
                    ...state.cart,
                    restaurants: !isOrdered ? [...state.cart.restaurants, restaurantWithOrderId] : state.cart.restaurants,
                    details: [...state.cart.details, newOrder],
                    totalPrice: state.cart.totalPrice + action.payload.price
                }
            }
        case DELETE_ORDER:
            const deletedOrder = state.cart.details.find(o => o.orderId === action.payload.orderId)
            const sameOrdersInCart = state.cart.details.filter(r => r.restaurant === deletedOrder.restaurant)
            return {
                ...state,
                cart: {
                    ...state.cart,
                    restaurants: sameOrdersInCart.length === 1 ? state.cart.restaurants.filter(r => r.name !== deletedOrder.restaurant) : state.cart.restaurants,
                    details: state.cart.details.filter(o => o.orderId !== action.payload.orderId),
                    totalPrice: state.cart.totalPrice - deletedOrder.price
                }
            }
        case MAKE_ORDER:
            const madeOrder = {
                date: new Date().toLocaleDateString("en-US"),
                details: action.payload.order.details,
                totalPrice: action.payload.order.totalPrice
            }
            return {
                ...state,
                orders: [...state.orders, madeOrder]
            }
        case RESET_CART:
            return {
                ...state,
                cart: {
                    restaurants: [],
                    details: [],
                    totalPrice: null
                },
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

export const addOrder = (restaurant, description, price) => ({type: ADD_ORDER, payload: {restaurant, description, price}})
export const deleteOrder = (orderId) => ({type: DELETE_ORDER, payload: {orderId}})
export const makeOrder = (order) => ({type: MAKE_ORDER, payload: {order}})
export const resetCart = () => ({type: RESET_CART})
export const setIsLoading = (isLoading) => ({type: SET_IS_LOADING, payload: {isLoading}})
export const setError = (err) => ({type: SET_ERROR, payload: {err}})
export const clearError = () => ({type: CLEAR_ERROR})