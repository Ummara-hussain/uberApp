import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from "react-native"
import * as Location from 'expo-location';

export default function Pickup({ navigation }) {
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    const [queryData, setQueryData] = useState([])

    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }

            //   let location = await Location.getCurrentPositionAsync({});
            //  console.log('location =>' , location)
            //   setLocation(location);
            Location.watchPositionAsync({
                accuracy: 6,
                distanceInterval: 0.5,
                timeInterval: 100
            }, (location) => {
                // console.log('location =>' , location)
                setLocation(location)
            })
        })();
    }, []);

    const getLocationsFromText = async (text) => {
        // fsq3aXSjqfPJ7Dq/RMVg1HrEbSMxeVqjg8Uo1fGSCcXGCTc=
        try {
            const { latitude, longitude } = location.coords
            const searchParams = new URLSearchParams({
                query: text,
                ll: `${latitude},${longitude}`,
                sort: 'DISTANCE'
            });
            const results = await fetch(
                `https://api.foursquare.com/v3/places/search?${searchParams}`,
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: 'fsq3aXSjqfPJ7Dq/RMVg1HrEbSMxeVqjg8Uo1fGSCcXGCTc=',
                    }
                }
            );
            const data = await results.json();
            console.log(data.results)
            setQueryData(data.results)
            return data;
        } catch (err) {
            console.error(err);
        }
    }
    if (errorMsg) {
        return <Text>{errorMsg}</Text>
    }
    if (!location) {
        return <Text>Loading...</Text>
    }

    return <View style={styles.container}>
        <TextInput
            style={styles.input}
            placeholder='Enter your Pickup location...'
            onChangeText={getLocationsFromText}
        />
        <MapView style={styles.map}
            region={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.00005,
                longitudeDelta: 0.00005
            }}>
            <Marker
                coordinate={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                }}
                title={'My location'}
                description={"I'm standing here"}
                image={{ uri: 'https://static.thenounproject.com/png/191851-200.png' }}
            />
        </MapView>
        <View style={styles.absolute}>
            {queryData.map((item) => {
                return <TouchableOpacity onPress={() => navigation.navigate('Destination', {
                    pickupLocation: item
                })}>
                    <Text>* {item.name}, {item.location.address}</Text>
                </TouchableOpacity>
            })}
        </View>
    </View>
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-around',
        alignItems: 'center'
    },
    input: {
        width: 350,
        height: 30,
        backgroundColor: 'white'
    },
    map: {
        width: '100%', 
        height: '90%',
    },
    absolute: {
        position: 'absolute',
        width: 250,
        top: 50,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        // padding: 10
     }
});