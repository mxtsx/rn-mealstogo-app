import React, {useEffect} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import styled from "styled-components";

const PickedImage = styled.Image`
  width: 200px;
  height: 200px;
  border-radius: ${200/2}px;
`

export const TakeImageComponent = ({image, saveImage, children}) => {
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestCameraPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        })

        if (!result.cancelled) {
            saveImage(result.uri)
        }
    };

    return (
        <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
            {image ?
                <PickedImage source={{ uri: image }} />
                : children}
        </TouchableOpacity>
    );
}