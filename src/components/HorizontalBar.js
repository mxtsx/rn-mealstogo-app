import React from 'react';
import {ScrollView, TouchableOpacity} from "react-native";
import styled from "styled-components";
import {RestaurantInfo} from "../screens/restaurants/components/restaurant-info.component";
import {useNavigation} from "@react-navigation/native";

const FavouritesWrapper = styled.View`
  padding: 10px;
`

const RestaurantContainer = styled.View`
  margin-right: 10px;
`

export const HorizontalBar = React.memo(({restaurants}) => {
    const navigation = useNavigation()
    return (
        <FavouritesWrapper>
           <ScrollView style={{width: '100%'}} horizontal showsHorizontalScrollIndicator={false}>
               {!!restaurants.length && restaurants.map(f => {
                   const key = !!f && f.name.split(' ').join("")
                   return(
                       <TouchableOpacity onPress={() => navigation.navigate('RestaurantDetail', {restaurant: f})} key={key} activeOpacity={0.7}>
                           <RestaurantContainer>
                               <RestaurantInfo restaurant={f}/>
                           </RestaurantContainer>
                       </TouchableOpacity>
                   )
               })}
           </ScrollView>
        </FavouritesWrapper>
    )
})