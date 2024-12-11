import { GestureResponderEvent, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Button } from '@rneui/themed';
import { useRouter } from 'expo-router'; // Use useRouter for better integration with expo-router
import GetStartedButton from '@/components/start/GetStartedButton';

const StartPage = () => {
    const router = useRouter(); // Use router instead of navigator for expo-router compatibility

    function handleRedirectToLoginPage(): void {
        router.push('/(start)/(auth)/login'); // Navigate to the login page
    }

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Start Page</Text>
            <GetStartedButton onPress={handleRedirectToLoginPage} />
        </View>
    );
};

export default StartPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    text: {
        fontSize: 24,
        marginBottom: 20,
    },
});
