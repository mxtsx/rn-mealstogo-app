import React, {useContext} from 'react';
import {FavouritesContext} from "../../../services/favourites/favourites.context";
import {RestaurantList} from "./restaurants.screen";
import {TouchableOpacity} from "react-native";
import {RestaurantInfo} from "../components/restaurant-info.component";
import {Text} from "../../../components/text.component";
import {useNavigation} from "@react-navigation/native";

export const FavouritesScreen = () => {
    const {favourites} = useContext(FavouritesContext)
    const navigation = useNavigation()
    return(
        <>
            {!!favourites.length ?
                <RestaurantList data={favourites}
                                keyExtractor={item => item.placeId}
                                renderItem={itemData => {
                                    return(
                                        <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('RestaurantDetail', {restaurant: itemData.item})}>
                                            <RestaurantInfo restaurant={itemData.item}/>
                                        </TouchableOpacity>
                                    )
                                }} /> :
            <Text>Favourites List is Empty!</Text>}
        </>
    )
}