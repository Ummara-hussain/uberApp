import { View, Text, Button, TextInput } from "react-native"

export default function SignIn({navigation}){
    return <View style={{flex: 1,justifyContent:'space-evenly' , alignItems: 'center' }}>
        <Text>SignIn</Text>
        <TextInput placeholder="Enter your email"/>
        <TextInput placeholder="Enter your email"/>
        <Button title='Signin'/>

        <Button title='Take a ride!' onPress={() => navigation.navigate('Pickup')} />
    </View>
}