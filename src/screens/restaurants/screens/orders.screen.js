import React, {useContext, useState} from 'react';
import {OrdersContext} from "../../../services/orders/orders.context";
import {ScrollView, TouchableOpacity} from "react-native";
import {Text} from "../../../components/text.component";
import styled from "styled-components";
import {IsEmptyContainer, IsEmptyLabel, ItemContainer} from "../components/order-item.styles";
import {OrderItemComponent} from "../components/order-item.component";
import {Spacer} from "../../../components/spacer.component";

const OrdersContainer = styled(ScrollView)`
  padding: ${props => props.theme.space[2]};
`

const OrdersList = styled(ItemContainer)`
  marginHorizontal: ${props => props.theme.space[1]};
  elevation: ${3};
`

const Order = ({order}) => {
    const [isToggle, setIsToggle] = useState(false)
    return (
        <ItemContainer>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setIsToggle(!isToggle)}>
                <Text>Your order from {order.date}</Text>
                <Spacer size={'medium'} position={'bottom'}/>
                {!!isToggle &&
                    <OrdersList>
                        {order.details.map((d, index) => {
                            return <OrderItemComponent key={index} index={index} restaurant={d.restaurant}
                                                       price={d.price} description={d.description}
                                                       onClickHandler={() => {
                                                       }}/>
                        })}
                    </OrdersList>}
                {!!isToggle && <Text>Total price is {(order.totalPrice.toFixed(2) * 100) / 100}</Text>}
            </TouchableOpacity>
        </ItemContainer>
    )
}

export const OrdersScreen = () => {
    const {orders} = useContext(OrdersContext)

    if(!orders.length) {
        return(
            <IsEmptyContainer>
                <IsEmptyLabel>Your Orders List is Empty</IsEmptyLabel>
            </IsEmptyContainer>
        )
    }

    return (
        <OrdersContainer>
            {orders.map((o, index) => {
                return <Order key={index} index={index} order={o} />
            })}
        </OrdersContainer>
    )
}