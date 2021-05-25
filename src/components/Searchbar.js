import * as React from 'react';
import {useCallback, useContext} from 'react';
import {Searchbar} from 'react-native-paper';
import styled from "styled-components";
import {Alert, Dimensions} from "react-native";
import {LocationContext} from "../services/location/location.context";

const SearchbarContainer = styled.View`
  min-height: ${Dimensions.get('window').height/15}px;
  padding: ${props => props.theme.space[2]}
`

export const SearchbarComponent = ({isToggled, isFavouritesList, setIsToggled, ...props}) => {
    const {search} = useContext(LocationContext)
    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = query => setSearchQuery(query)

    const onSearchHandler = useCallback((keyword) => {
        if (keyword.trim()) {
            search(keyword.toLowerCase())
        } else {
            Alert.alert('Whoops', 'Please, enter the text')
        }
    }, [])

    return (
        <SearchbarContainer>
            <Searchbar
                icon={isToggled && isFavouritesList ? 'heart' : 'heart-outline'}
                placeholder="Choose your city"
                onChangeText={onChangeSearch}
                value={searchQuery}
                onIconPress={() => {
                    isFavouritesList ?
                    setIsToggled(!isToggled)
                        : Alert.alert('Sorry', 'No favourites restaurants found.\nBut you can add them!')
                }
                }
                onSubmitEditing={() => onSearchHandler(searchQuery)}
                {...props}
            />
        </SearchbarContainer>
    )
}