import { GestureResponderEvent, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
// import { Button } from '@rneui/themed';
import { useRouter } from 'expo-router';
import GetStartedButton from '@/components/start/GetStartedButton';

const StartPage = () => {
    const router = useRouter();

    function handleRedirectToLoginPage() {
        router.push('/(start)/(auth)/login'); // Navigate to the login page
    }

    return (
        <ImageBackground
            source={require('assets/images/start-screen.png')}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <GetStartedButton onPress={handleRedirectToLoginPage} />
            </View>
        </ImageBackground>
    );
};

export default StartPage;

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 0
    },
    text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
});
