import { View, Text, Button, TextInput, StyleSheet } from "react-native"

export default function SignIn({ navigation }) {
    return <View style={styles.container}>
        <Text style={{ fontSize: 40, fontWeight: "bold", color: 'white' }}>Uber</Text>

        <TextInput style={styles.input} placeholder="Enter your email" />
        <TextInput style={styles.input} placeholder="Enter your password" />
        <Button title='Sign in' />
        <Button color='black' title='Take a ride!' onPress={() => navigation.navigate('Pickup')} />
    </View>
}

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center', backgroundColor: 'black', color: 'white', justifyContent: 'space-evenly', padding: 100
    },
    input: {
        color: 'black', backgroundColor: 'white', width: 200,
    },
})