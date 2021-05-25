import React from 'react';
import {SvgXml} from "react-native-svg";
import star from "../../../../assets/star";
import open from "../../../../assets/open";
import {Text} from "../../../components/text.component";
import {
    Address,
    ClosedTemporarily,
    IconsWrapper,
    IsClosedNow,
    IsDinner,
    IsOpenWrapper,
    RestaurantCardContainer,
    RestaurantCardCover,
    StarsWrapper,
    TitleWrapper
} from "./restaurant-info.styles";
import {Favourite} from "../../../components/Favourite";

export const RestaurantInfo = React.memo(({restaurant = {}}) => {
    const {
        name,
        icon,
        photos,
        vicinity,
        isOpenNow,
        rating,
        isClosedTemporarily
    } = restaurant
    let ratingArray = []
    for(let i = 0; i < Math.floor(rating); i++) {
        ratingArray.push(i)
    }
    return (
        <RestaurantCardContainer elevation={5}>
            <Favourite restaurant={restaurant} />
            <RestaurantCardCover key={name} source={{uri: photos}}/>
            <TitleWrapper>
                <Text variant={'label'}>{name}</Text>
                <IconsWrapper>
                    <StarsWrapper>
                        {ratingArray.map((s, index) => {
                            return <SvgXml key={index} width={20} height={20} xml={star}/>
                        })}
                    </StarsWrapper>
                    <IsOpenWrapper>
                        {isClosedTemporarily &&
                        <ClosedTemporarily variant={'error'}>
                            Closed Temporarily
                        </ClosedTemporarily>}
                        {isOpenNow && <IsClosedNow xml={open}/>}
                        <IsDinner source={{uri: icon}}/>
                    </IsOpenWrapper>
                </IconsWrapper>
                <Address variant={'caption'}>{vicinity}</Address>
            </TitleWrapper>
        </RestaurantCardContainer>
    )
})