import React from 'react';
import {Text} from "../../../components/text.component";

export const OrderItemComponent = ({index, description, price, restaurant, ...props}) => {
    return <Text>{index + 1}. {description}: ${(price.toFixed(2) * 100) / 100} from {restaurant}</Text>
}