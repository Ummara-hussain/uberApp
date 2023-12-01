import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity } from "react-native"
import React, { useEffect, useState } from "react"
import MapView, { Marker } from "react-native-maps"
import * as Location from 'expo-location'

export default function Destination({ navigation, route }) {
    const { pickupLocation } = route.params
    const [location, setLocation] = useState(null)
    const [queryData, setQueryData] = useState([])

    useEffect(() => {
        (async () => {
            let location = await Location.getCurrentPositionAsync({});
            console.log(location)
            setLocation(location);
        })();
    }, []);

    const getLocationsFromText = (text) => {
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                Authorization: 'fsq3aXSjqfPJ7Dq/RMVg1HrEbSMxeVqjg8Uo1fGSCcXGCTc=',
            }
        };
        const { latitude, longitude } = location.coords
        fetch(`https://api.foursquare.com/v3/places/search?query=${text}&ll=${latitude},${longitude}`, options)
            .then(response => response.json())
            .then(response => setQueryData(response.results))
            .catch(err => console.error(err));
    }

    if (!location) {
        return <Text>Loading...</Text>
    }

    return <View style={styles.container}>
        <Text>Pickup Location: {pickupLocation.name}</Text>
        <TextInput
            placeholder='Enter destination'
            onChangeText={getLocationsFromText}
        />
        <MapView style={styles.map}
            region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0005,
                longitudeDelta: 0.0005
            }}
        >
            <Marker
                coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}
                title={'My destination'}
                description={"Destination location"}
                image={{ uri: 'https://static.thenounproject.com/png/191851-200.png' }}
            />
        </MapView>
        <View style={styles.absolute}>
            {queryData.map((item) => {
                return <TouchableOpacity onPress={() => setLocation({
                    coords: {
                        latitude: item.geocodes.main.latitude,
                        longitude: item.geocodes.main.longitude,
                        location: item
                    }
                })}>
                    <Text>* {item.name}, {item.location.address}</Text>
                </TouchableOpacity>
            })}
        </View>

        <Button title="Car Selection" onPress={() => navigation.navigate('Select your Ride', {
            pickupLocation, destinationLocation: location
        })} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '80%',
    },
    absolute: {
        position: 'absolute',
        width: 200,
        top: 60,
        backgroundColor: 'white'
    }
});