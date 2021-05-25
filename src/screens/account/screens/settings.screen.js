import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from "../../../services/auth/auth.context";
import {Avatar, List} from "react-native-paper";
import {useNavigation} from "@react-navigation/native";
import styled from "styled-components";
import {Spacer} from "../../../components/spacer.component";
import {Text} from "../../../components/text.component";
import {TakeImageComponent} from "../../../components/TakeImageComponent";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {ActivityIndicator} from "react-native";
import {theme} from "../../../utils/theme";

const SettingsItem = styled(List.Item)`
  padding: ${props => props.theme.space[2]};
`

const AvatarContainer = styled.View`
  align-items: center;
`

export const SettingsScreen = () => {
    const [image, setImage] = useState(null)
    const [imageIsLoading, setImageIsLoading] = useState(false)
    const {logOut, user} = useContext(AuthContext)
    const navigation = useNavigation()

    const getProfilePicture = async (currentUser) => {
        setImageIsLoading(true)
        const picture = await AsyncStorage.getItem(`${currentUser.uid}-photo`)
        setImage(picture)
        setImageIsLoading(false)
    }

    const savePicture = async (imageUrl) => {
        setImage(imageUrl)
        await AsyncStorage.setItem(`${user.uid}-photo`, imageUrl)
    }

    useEffect(() => {
        getProfilePicture(user)
    }, [])

    return (
        <>
            <List.Section>
                <AvatarContainer>
                    <TakeImageComponent image={image}
                                        saveImage={savePicture}>
                        {imageIsLoading ?
                        <ActivityIndicator style={{height: 180, width: 180}} size={'small'} color={theme.colors.ui.primary} />
                        : <Avatar.Icon size={180} icon='human' backgroundColor={'#2182BD'} />}
                    </TakeImageComponent>
                    <Spacer position={'top'} size={'large'}/>
                    <Text variant={'label'}>{user?.email}</Text>
                </AvatarContainer>
                <Spacer position={'top'} size={'large'}/>
                <SettingsItem title={'Favorites'}
                              left={props => <List.Icon {...props} color={'black'} icon={'heart'}/>}
                              onPress={() => navigation.navigate('Favourites')}/>
                <SettingsItem title={'Yours Orders'}
                              left={props => <List.Icon {...props} color={'black'} icon={'cart'}/>}
                              onPress={() => navigation.navigate('Orders')}/>
                <SettingsItem title={'Logout'}
                              left={props => <List.Icon {...props} color={'black'} icon={'logout'}/>}
                              onPress={() => logOut()}/>
            </List.Section>
        </>
    )
}