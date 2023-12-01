import { View, Text, Button, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Image } from 'expo-image';
import { useState, useEffect } from "react";
import { addARide, doc, onSnapshot, db } from "../config/firebase";


export default function CarSelection({ navigation, route }) {
    const { pickupLocation, destinationLocation } = route.params
    const [distance, setDistance] = useState(0)
    const [fare, setFare] = useState(0)
    const [rideType, setRideType] = useState()
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        const { latitude: pickupLatitude, longitude: pickupLongitude } = pickupLocation.geocodes.main
        const { latitude: destinationLatitude, longitude: destinationLongitude } = destinationLocation.coords
        const distance = calcCrow(pickupLatitude, pickupLongitude, destinationLatitude, destinationLongitude)
        setDistance(distance)
    }, [])

    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        var lat1 = toRad(lat1);
        var lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }
    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    async function requestRide() {
        const { latitude: pickupLatitude, longitude: pickupLongitude } = pickupLocation.geocodes.main
        const { latitude: destinationLatitude, longitude: destinationLongitude } = destinationLocation.coords

        setLoading(true)

        const request = {
            pickup: {
                latitude: pickupLatitude,
                longitude: pickupLongitude,
                name: pickupLocation.name,
                address: pickupLocation.location.address
            },
            destination: {
                latitude: destinationLatitude,
                longitude: destinationLongitude,
                name: destinationLocation.coords.location.name,
                address: destinationLocation.coords.location.location.address
            },
            rideType,
            fare,
            status: 'pending...'
        }
        const docId = await addARide(request)

        const unsub = onSnapshot(doc(db, "rides", docId), (doc) => {
            console.log("Current data: ", doc.data());
            const data = { id: doc.id, ...doc.data() }
            if (data.status === 'accepted') {
                navigation.navigate('Ride', data)
                unsub()
            }
        })

        alert('Ride requested successfully')
    }

    return <View style={styles.container}>
        <Text>Pickup Location: {pickupLocation.name} {"\n"}
            Destination Location: {destinationLocation.coords.location.name}
        </Text>
        <Text>Distance: {distance.toFixed(2)} KM {"\n"}
            Fare: Rs. {Math.round(fare)} {"\n"}
            Your Ride: {rideType}</Text>

        <View>
            <Text style={styles.rides} onPress={() => {
                setRideType('Bike')
                setFare(distance * 70)
            }}>Bike
                <Image source={{ uri: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_538/v1571927853/assets/39/c1c2c7-61eb-4432-9bac-728b974207e7/original/cityscoot-icon-mobile.png' }}
                    style={styles.image} /></Text>
            <Text style={styles.rides} onPress={() => {
                setRideType('Auto Rikshaw')
                setFare(distance * 100)
            }}>Auto Rikshaw
                <Image source={{ uri: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_956,h_638/v1648432113/assets/6e/86fff4-a82a-49b9-8b0b-54b341ea0790/original/Uber_Auto_312x208_pixels_Mobile.png' }}
                    style={styles.image} /></Text>
            <Text style={styles.rides} onPress={() => {
                setRideType('Mini Ride')
                setFare(distance * 150)
            }}>Mini Ride
                <Image source={{ uri: 'https://w7.pngwing.com/pngs/1012/760/png-transparent-compact-car-2010-toyota-corolla-suzuki-cultus-car-compact-car-car-window.png' }}
                    style={styles.image} /></Text>
            <Text style={styles.rides} onPress={() => {
                setRideType('AC Ride')
                setFare(distance * 200)
            }}>AC Ride
                <Image source={{ uri: 'https://fixigo.in/fixigonewdesign/fixigo_marvel/images/ServiceIcons/Car%20AC.png' }}
                    style={styles.image} /></Text>
        </View>

        <Button title="LET'S GO!" onPress={() => requestRide()} />
        {loading && <ActivityIndicator size='large' />}

    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 40,
        height: 40,
    },
    rides: {
        fontSize: 14,
        backgroundColor: 'white',
        margin: 3,
        padding: 1,
        height: 65,
    }
})