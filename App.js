import {StatusBar as ExpoStatusBar} from 'expo-status-bar';
import React from 'react';
import {StatusBar} from 'react-native';
import styled, {ThemeProvider} from 'styled-components'
import {Oswald_400Regular, useFonts as useOswald} from "@expo-google-fonts/oswald";
import {Lato_400Regular, useFonts as useLato} from "@expo-google-fonts/lato";
import {AppNavigation} from "./src/navigation/AppNavigation";
import firebase from 'firebase'
import {AuthState} from "./src/services/auth/auth.state";
import {theme} from "./src/utils/theme";

const AppContainer = styled.SafeAreaView`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
  background-color: ${theme.colors.bg.primary};
`

const firebaseConfig = {
    apiKey: "AIzaSyBva3ryGixJxivS25U-OzngZ7NUWBeDy88",
    authDomain: "rn-mealstogo-app.firebaseapp.com",
    projectId: "rn-mealstogo-app",
    storageBucket: "rn-mealstogo-app.appspot.com",
    messagingSenderId: "252170354418",
    appId: "1:252170354418:web:dcf63e067512d8c953da6b"
};

if(!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export default function App() {
    const [oswaldLoaded] = useOswald({
        Oswald_400Regular
    })
    const [latoLoaded] = useLato({
        Lato_400Regular
    })

    if(!oswaldLoaded || !latoLoaded ) {
        return null
    }

    return (
        <AppContainer>
            <ThemeProvider theme={theme}>
            <AuthState>
                    <AppNavigation/>
                </AuthState>
            <ExpoStatusBar style="auto"/>
            </ThemeProvider>
        </AppContainer>
    );
}
