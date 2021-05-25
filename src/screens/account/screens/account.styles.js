import React from 'react';
import styled from "styled-components";
import {Button, TextInput} from "react-native-paper";
import {Text} from "../../../components/text.component";

export const AccountBackground = styled.ImageBackground.attrs({
    source: require('./home_bg.jpg')
})`
  flex: 1;
  align-items: center;
  justify-content: center;
`

export const AccountCover = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.3);
`

export const AccountContainer = styled.View`
  background-color: rgba(255, 255, 255, 0.7);
  padding: ${props => props.theme.space[4]};
  margin-top: ${props => props.theme.space[2]};
`

export const AuthButton = styled(Button)`
  padding: ${props => props.theme.space[2]};
`

export const Title = styled(Text)`
  font-size: 30px;
  color: #000
`

export const AuthInput = styled(TextInput)`
  width: 300px;
`;

export const ErrorContainer = styled.View`
  max-width: 300px;
  align-items: center;
  justify-content: center;
`