import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from '../screens/SignIn';
import Pickup from '../screens/Pickup';
import Destination from '../screens/Destination';
import CarSelection from '../screens/CarSelection';

const Stack = createStackNavigator();


export default function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='Signin'>
                <Stack.Screen name="Sigin" component={SignIn} />
                <Stack.Screen name="Pickup" component={Pickup} />
                <Stack.Screen name="Destination" component={Destination} />
                <Stack.Screen name="Select your Ride" component={CarSelection} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}