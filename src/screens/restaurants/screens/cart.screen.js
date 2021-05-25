import React, {useContext} from 'react';
import {HorizontalBar} from "../../../components/HorizontalBar";
import {OrdersContext} from "../../../services/orders/orders.context";
import {ScrollView, TouchableOpacity} from "react-native";
import {Text} from "../../../components/text.component";
import styled from "styled-components";
import {IsEmptyContainer, IsEmptyLabel, ItemContainer} from "../components/order-item.styles";
import {OrderItemComponent} from "../components/order-item.component";
import {Button} from "react-native-paper";
import {colors} from "../../../utils/theme/colors";

const OrderContainer = styled.View`
  marginHorizontal: ${props => props.theme.space[3]};
`

const PriceContainer = styled.View`
  marginHorizontal: ${props => props.theme.space[2]};
  margin-bottom: ${props => props.theme.space[2]};
`

const OrderLabel = styled(Text)`
  padding-bottom: ${props => props.theme.space[2]};
`

const OrderButtonContainer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`

const OrderButton = styled(Button)`
  width: 35%;
  marginVertical: ${props => props.theme.space[2]};
  paddingVertical: ${props => props.theme.space[1]};
`

export const CartScreen = () => {
    const {cart, removeOrder, checkout} = useContext(OrdersContext)

    if(!cart?.details.length) {
       return(
           <IsEmptyContainer>
               <IsEmptyLabel>Your Cart is Empty</IsEmptyLabel>
           </IsEmptyContainer>
       )
    }

    return (
        <ScrollView>
            {<HorizontalBar restaurants={cart?.restaurants}/>}
            <OrderContainer>
                <OrderLabel variant={'label'}>Your Order</OrderLabel>
                <PriceContainer>
                    {cart?.details?.map((r, index) => {
                        return (
                            <TouchableOpacity activeOpacity={0.7}
                                              key={index}
                                              onLongPress={() => removeOrder(r.orderId)}
                                              useForeground={true}>
                                <ItemContainer>
                                    <OrderItemComponent index={index}
                                                        restaurant={r.restaurant}
                                                        price={r.price}
                                                        description={r.description}/>
                                </ItemContainer>
                            </TouchableOpacity>
                        )
                    })}
                </PriceContainer>
                <OrderLabel variant={'label'}>Total Price</OrderLabel>
                <PriceContainer>
                    <ItemContainer>
                        <Text>${(cart?.totalPrice.toFixed(2) * 100) / 100}</Text>
                    </ItemContainer>
                </PriceContainer>
                <OrderButtonContainer>
                    <OrderButton color={colors.brand.primary}
                                 onPress={() => checkout(cart)}
                                 mode={'contained'}>
                        Order Now!
                    </OrderButton>
                </OrderButtonContainer>
            </OrderContainer>
        </ScrollView>
    )
}