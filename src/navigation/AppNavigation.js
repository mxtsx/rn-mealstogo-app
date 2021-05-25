import 'react-native-gesture-handler';
import * as React from 'react';
import {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from "@react-navigation/stack";
import {RestaurantsScreen} from "../screens/restaurants/screens/restaurants.screen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {SettingsScreen} from "../screens/account/screens/settings.screen";
import {MapScreen} from "../screens/restaurants/screens/map.screen";
import {Ionicons} from "@expo/vector-icons";
import {RestaurantDetailScreen} from "../screens/restaurants/screens/restaurant-detail.screen";
import {ActivityIndicator, Platform} from "react-native";
import {AuthContext} from "../services/auth/auth.context";
import {LoginScreen} from "../screens/account/screens/login.screen";
import {AccountScreen} from "../screens/account/screens/account.screen";
import {RegisterScreen} from "../screens/account/screens/register.screen";
import {colors} from "../utils/theme/colors";
import styled from "styled-components";
import {LocationState} from "../services/location/location.state";
import {RestaurantsState} from "../services/restaurants/restaurants.state";
import {FavouritesState} from "../services/favourites/favourites.state";
import {FavouritesScreen} from "../screens/restaurants/screens/favourites.screen";
import {CartScreen} from "../screens/restaurants/screens/cart.screen";
import {OrdersState} from "../services/orders/orders.state";
import {OrdersScreen} from "../screens/restaurants/screens/orders.screen";

const restaurantStackProperties = {
    screenOptions: Platform.OS === 'ios' && {...TransitionPresets.ModalPresentationIOS}
}

const hideHeaderProperty = {
    headerShown: false
}

const bottomTabIcon = (name, size = 23) => ({
    tabBarIcon: ({ color }) => (
        <Ionicons name={name} color={color} size={size} />
    )
})

const CustomActivityIndicator = styled(ActivityIndicator)`
  flex: 1
`

const Stack = createStackNavigator()

const RestaurantStack = () => {
    return(
        <Stack.Navigator {...restaurantStackProperties}>
            <Stack.Screen name={'Restaurants'} component={RestaurantsScreen} options={hideHeaderProperty}/>
            <Stack.Screen name={'RestaurantDetail'} component={RestaurantDetailScreen} />
        </Stack.Navigator>
    )
}

const SettingsStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name={'Settings'} component={SettingsScreen}/>
            <Stack.Screen name={'Favourites'} component={FavouritesScreen}/>
            <Stack.Screen name={'Orders'} component={OrdersScreen}/>
            <Stack.Screen name={'RestaurantDetail'} component={RestaurantDetailScreen} />
        </Stack.Navigator>
    )
}

const AccountStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name={'Main'} component={AccountScreen} options={hideHeaderProperty}/>
            <Stack.Screen name={'Login'} component={LoginScreen} options={hideHeaderProperty}/>
            <Stack.Screen name={'Register'} component={RegisterScreen} options={hideHeaderProperty}/>
        </Stack.Navigator>
    )
}

const CartStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name={'Cart'} component={CartScreen} />
            <Stack.Screen name={'RestaurantDetail'} component={RestaurantDetailScreen} />
        </Stack.Navigator>
    )
}

const MapStack = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name={'Map'} component={MapScreen} options={hideHeaderProperty}/>
            <Stack.Screen name={'RestaurantDetail'} component={RestaurantDetailScreen} />
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return(
        <LocationState>
            <RestaurantsState>
                <FavouritesState>
                    <OrdersState>
                        <Tab.Navigator>
                            <Tab.Screen name={'Restaurants'} component={RestaurantStack}
                                        options={bottomTabIcon('ios-restaurant-sharp')}/>
                            <Tab.Screen name={'Cart'} component={CartStack}
                                        options={bottomTabIcon('ios-cart')}/>
                            <Tab.Screen name={'Map'} component={MapStack} options={bottomTabIcon('ios-map')}/>
                            <Tab.Screen name={'Settings'} component={SettingsStack}
                                        options={bottomTabIcon('ios-settings-sharp')}/>
                        </Tab.Navigator>
                    </OrdersState>
                </FavouritesState>
            </RestaurantsState>
        </LocationState>
    )
}

export const AppNavigation = () => {
    const {isAuth, checkIsAuth, isLoading} = useContext(AuthContext)

    useEffect( () => {
        checkIsAuth()
    }, [])

    if(isLoading) {
        return <CustomActivityIndicator size={'large'} color={colors.ui.primary} />
    }

    return (
        <NavigationContainer>
            {isAuth
                ? <TabNavigator />
                : <AccountStack />}
        </NavigationContainer>
    );
}