import React, {useContext, useLayoutEffect, useState} from 'react';
import {RestaurantInfo} from "../components/restaurant-info.component";
import {useNavigation, useRoute} from "@react-navigation/native";
import {AccordionList} from "../../../components/AccordionList";
import {Button, List} from 'react-native-paper';
import {ScrollView} from "react-native";
import styled from "styled-components";
import {colors} from "../../../utils/theme/colors";
import {OrdersContext} from "../../../services/orders/orders.context";

const OrderButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`

const OrderButton = styled(Button)`
  width: 75%;
  marginVertical: ${props => props.theme.space[3]};
  paddingVertical: ${props => props.theme.space[1]};
`

export const RestaurantDetailScreen = () => {
    const {addToCart, isLoading} = useContext(OrdersContext)
    const [breakfastExpanded, setBreakfastExpanded] = useState(false)
    const [launchExpanded, setLaunchExpanded] = useState(false)
    const [dinnerExpanded, setDinnerExpanded] = useState(false)
    const [drinksExpanded, setDrinksExpanded] = useState(false)

    const {restaurant} = useRoute().params

    const navigation = useNavigation()

    const makeOrder = (restaurant, description, price) => {
        addToCart(restaurant, description, price)
        navigation.navigate('Cart')
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            title: restaurant.name
        })
    }, [navigation, restaurant])

    return(
        <ScrollView>
            <RestaurantInfo restaurant={restaurant}/>
                <AccordionList title={'Breakfast'}
                               expanded={breakfastExpanded}
                               setExpanded={setBreakfastExpanded}
                               left={props => <List.Icon {...props} icon={'bread-slice'}/>}
                               items={[{title: 'Spaghetti Bolognese', key: 'spaghetti'},
                                   {title: 'Veal Cutlet', key: 'cutlet'},
                                   {title: 'Steak Frites', key: 'frites'}]}/>
            <AccordionList title={'Lunch'}
                               expanded={launchExpanded}
                               setExpanded={setLaunchExpanded}
                               left={props => <List.Icon {...props} icon={'hamburger'}/>}
                               items={[{title: 'Eggs benedict', key: 'eggs'},
                                   {title: 'Classic Breakfast', key: 'breakfast'}]} />
                <AccordionList title={'Dinner'}
                               expanded={dinnerExpanded}
                               setExpanded={setDinnerExpanded}
                               left={props => <List.Icon {...props} icon={'food-variant'}/>}
                               items={[{title: 'Burger witch Fries', key: 'burger'},
                                   {title: 'Steak Sandwich', key: 'sandwich'},
                                   {title: 'Mushroom Soup', key: 'soup'}]} />
                <AccordionList title={'Drinks'}
                               expanded={drinksExpanded}
                               setExpanded={setDrinksExpanded}
                               left={props => <List.Icon {...props} icon={'cup'}/>}
                               items={[{title: 'Coffee', key: 'coffee'},
                                   {title: 'Tea', key: 'tea'},
                                   {title: 'Modelo', key: 'modelo'},
                                   {title: 'Coke', key: 'coke'},
                                   {title: 'Fanta', key: 'fanta'}]} />
            <OrderButtonContainer>
                <OrderButton icon={'plus'}
                             color={colors.brand.primary}
                             disabled={isLoading}
                             onPress={() => makeOrder(restaurant, 'special', 12.99)}
                             mode={'contained'}>ORDER SPECIAL ONLY 12.99!</OrderButton>
            </OrderButtonContainer>
        </ScrollView>
    )
}