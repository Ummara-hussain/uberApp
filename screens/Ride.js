import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function Ride({ route }) {
    const { id, pickup, destination } = route.params

    return <View>
        <MapView
            style={styles.map}
            region={{
                latitude: pickup.latitude,
                longitude: pickup.longitude,
                latitudeDelta: 0.0005,
                longitudeDelta: 0.0005
            }}
        >

            <Marker
                coordinate={{
                    latitude: pickup.latitude,
                    longitude: pickup.longitude,
                }}
                title={pickup.name}
                description={pickup.address}
            />

            <Marker
                coordinate={{
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                }}
                title={destination.name}
                description={destination.address}
            />



        </MapView>
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
        height: '100%',
    }

});
export default Ride