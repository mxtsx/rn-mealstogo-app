import React, {useContext, useState} from 'react';
import {
    AccountBackground,
    AccountContainer,
    AccountCover,
    AuthButton,
    AuthInput,
    ErrorContainer,
    Title
} from "./account.styles";
import {colors} from "../../../utils/theme/colors";
import {useNavigation} from "@react-navigation/native";
import {Spacer} from "../../../components/spacer.component";
import {AuthContext} from "../../../services/auth/auth.context";
import {Text} from "../../../components/text.component";

export const RegisterScreen = () => {
    const {onRegister, error} = useContext(AuthContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')

    const navigation = useNavigation()

    return(
        <AccountBackground>
            <Title>Meals To Go</Title>
            <AccountCover />
            <AccountContainer>
                <AuthInput label="Email"
                           value={email}
                           textContentType={'emailAddress'}
                           keyboardType={'email-address'}
                           autoCapitalize={'none'}
                           onChangeText={text => setEmail(text)}/>
                <Spacer size={'large'}/>
                <AuthInput label="Password"
                           value={password}
                           textContentType={'password'}
                           secureTextEntry
                           autoCapitalize={'none'}
                           secure
                           onChangeText={text => setPassword(text)}/>
                <Spacer size={'large'}/>
                <AuthInput label="Repeat Password"
                           value={repeatedPassword}
                           textContentType={'password'}
                           secureTextEntry
                           autoCapitalize={'none'}
                           secure
                           onChangeText={text => setRepeatedPassword(text)}/>
                <Spacer size={'large'}/>
                {!!error &&
                <ErrorContainer>
                    <Text variant={'error'}>
                        {error?.message}
                    </Text>
                </ErrorContainer>
                }
                <Spacer size={'large'}/>
                <AuthButton icon={'lock-open-outline'}
                            color={colors.brand.primary}
                            onPress={() => {
                                onRegister(email, password, repeatedPassword)
                            }}
                            mode={'contained'}>
                    Register
                </AuthButton>
            </AccountContainer>
            <Spacer size={'large'}/>
            <AuthButton mode={'contained'}
                        color={colors.brand.primary}
                        onPress={() => navigation.goBack()}>
                Back
            </AuthButton>
        </AccountBackground>
    )
}