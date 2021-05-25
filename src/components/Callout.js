import React from 'react';
import {Text} from "./text.component";
import styled from "styled-components";
import {Image, Platform} from "react-native";
import WebView from "react-native-webview";

const CalloutImage = Platform.OS === 'android' ? WebView : Image

const CompactImage = styled(CalloutImage)`
  border-radius: 10px;
  width: 120px;
  height: 100px;
`

const Item = styled.View`
  padding: 10px;
  max-width: 120px;
  align-items: center;
`

export const Callout = ({restaurant}) => {
    return (
        <Item>
            <CompactImage source={{uri: restaurant.photos}}/>
            <Text>
                {restaurant.name}
            </Text>
        </Item>
    );
};