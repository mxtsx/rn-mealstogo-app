import React, {useCallback, useContext} from 'react';
import {TouchableOpacity} from "react-native";
import {FavouritesContext} from "../services/favourites/favourites.context";
import styled from "styled-components";
import {AntDesign} from "@expo/vector-icons";

const FavouriteButton = styled(TouchableOpacity)`
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 9;
`

export const Favourite = React.memo(({restaurant}) => {
    const {favourites, addFavourite, deleteFavourite} = useContext(FavouritesContext)
    const isFavourite = favourites.find(r => r.placeId === restaurant.placeId)
    const onPressHandler = useCallback(() => {
        !isFavourite ? addFavourite(restaurant) : deleteFavourite(restaurant.placeId)
    }, [isFavourite, addFavourite, deleteFavourite])
    return (
        <FavouriteButton activeOpacity={0.6} onPress={onPressHandler}>
            <AntDesign name={isFavourite ? 'heart' : 'hearto'} size={24} color={isFavourite ? 'red' : 'white'}/>
        </FavouriteButton>
    )
})