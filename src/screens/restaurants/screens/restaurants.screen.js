import React, {useCallback, useContext, useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity} from "react-native";
import {SearchbarComponent} from "../../../components/Searchbar";
import {RestaurantInfo} from "../components/restaurant-info.component";
import styled from "styled-components";
import {RestaurantsContext} from "../../../services/restaurants/restaurants.context";
import {theme} from "../../../utils/theme";
import {LocationContext} from "../../../services/location/location.context";
import {useNavigation} from "@react-navigation/native";
import {HorizontalBar} from "../../../components/HorizontalBar";
import {FavouritesContext} from "../../../services/favourites/favourites.context";

export const RestaurantList = styled.FlatList.attrs({
    contentContainerStyle: {
        padding: 16
    }
})``

const Preloader = styled(ActivityIndicator)`
  flex: 1;
`

export const RestaurantsScreen = React.memo(() => {
    const {restaurants, fetchRestaurants, isLoading} = useContext(RestaurantsContext)
    const {location} = useContext(LocationContext)
    const {favourites} = useContext(FavouritesContext)
    const [isToggled, setIsToggled] = useState(false)

    const navigation = useNavigation()
    const stringifyLocation = !!location && `${location.lat},${location.lng}`

    const fetchData = useCallback(() => {
        fetchRestaurants(stringifyLocation)
    }, [stringifyLocation, restaurants])

    useEffect(() => {
        fetchData()
    }, [stringifyLocation])

    return (
        <>
            <SearchbarComponent isToggled={isToggled} isFavouritesList={!!favourites.length} setIsToggled={setIsToggled}/>
            {isToggled && !!favourites.length &&
            <HorizontalBar restaurants={favourites} />}
            {isLoading
                ? <Preloader size={'large'} color={theme.colors.ui.primary}/>
                : <RestaurantList data={restaurants}
                keyExtractor={(item => item.placeId)}
                renderItem={itemData => {
                    return(
                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('RestaurantDetail', {restaurant: itemData.item})}>
                            <RestaurantInfo restaurant={itemData.item}/>
                        </TouchableOpacity>
                    )
                }}/>}
        </>
    )
})