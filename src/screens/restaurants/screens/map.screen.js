import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import MapView from 'react-native-maps';
import styled from "styled-components";
import {MapSearchbarComponent} from "../../../components/MapSearchbar";
import {LocationContext} from "../../../services/location/location.context";
import {RestaurantsContext} from "../../../services/restaurants/restaurants.context";
import {Callout} from "../../../components/Callout";
import {useNavigation} from "@react-navigation/native";

const MapContainer = styled.View`
  flex: 1;
  background-color: #fff;
  align-items: center;
  justify-content: center;
`

const CustomMapView = styled(MapView)`
  width: 100%;
  height: 100%
`

export const MapScreen = () => {
    const {location} = useContext(LocationContext)
    const {restaurants} = useContext(RestaurantsContext)
    const [latDelta, setLatDelta] = useState(0)
    const navigation = useNavigation()

    useEffect(() => {
        if(location) {
            setLatDelta(location?.viewport?.northeast?.lat - location?.viewport?.southwest?.lat)
        }
    }, [location])

    const mapRegion = {
        latitude: location?.lat ? location?.lat : 0,
        longitude: location?.lng ? location?.lng : 0,
        latitudeDelta: latDelta,
        longitudeDelta: 0.02
    }

    return (
        <MapContainer>
            <MapSearchbarComponent />
            <CustomMapView
                region={mapRegion}
            >
                {!!restaurants.length && restaurants.map(r => {
                    return <MapView.Marker title={r.name}
                                           key={r.placeId}
                                           coordinate={{
                                               latitude: r.geometry.location.lat,
                                               longitude: r.geometry.location.lng
                                           }}>
                        <MapView.Callout onPress={() => navigation.navigate('RestaurantDetail', {restaurant: r})}>
                            <Callout restaurant={r}/>
                        </MapView.Callout>
                    </MapView.Marker>
                })}
            </CustomMapView>
        </MapContainer>
    );
}
