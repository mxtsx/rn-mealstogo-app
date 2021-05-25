import React from 'react';
import {AccountBackground, AccountContainer, AccountCover, AuthButton, Title} from "./account.styles";
import {colors} from "../../../utils/theme/colors";
import {Spacer} from "../../../components/spacer.component";
import {useNavigation} from "@react-navigation/native";
import LottieView from 'lottie-react-native';
import styled from "styled-components";

const AnimationWrapper = styled.View`
  width: 100%;
  height: 40%;
  position: absolute;
  top: 30px;
  padding: ${props => props.theme.space[2]}
`

export const AccountScreen = () => {
    const navigation = useNavigation()
    return (
        <AccountBackground>
            <Title>Meals To Go</Title>
            <AccountCover/>
            <AnimationWrapper>
                <LottieView
                    key={'animation'}
                    autoPlay
                    loop
                    resizeMode={'cover'}
                    source={require('../../../../assets/watermelon.json')}/>
            </AnimationWrapper>
            <AccountContainer>
                <AuthButton icon={'lock-open-outline'}
                            color={colors.brand.primary}
                            onPress={() => navigation.navigate('Login')}
                            mode={'contained'}>
                    Login
                </AuthButton>
                <Spacer size={'large'}/>
                <AuthButton icon={'lock-open-outline'}
                            color={colors.brand.primary}
                            onPress={() => navigation.navigate('Register')}
                            mode={'contained'}>
                    Register
                </AuthButton>
            </AccountContainer>
        </AccountBackground>
    )
}