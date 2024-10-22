import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const FindNewInterestMessage = () => {
    return (
        <Pressable onPress={() => { Alert.alert("Redirect to topics search page") }} style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.label}>Search new topics</Text>
            </View>
        </Pressable>
    );
}

export default FindNewInterestMessage

const styles = StyleSheet.create({
    container: {
        width: 360,
        padding: 10, // Space around the button
    },
    innerContainer: {
        borderWidth: 2, // Width of the dashed border
        borderColor: '#007AFF', // Border color
        borderStyle: 'dashed', // Dashed border
        borderRadius: 25, // Rounded pill shape
        paddingVertical: 12, // Vertical padding inside the button
        paddingHorizontal: 20, // Horizontal padding inside the button
        alignItems: 'center', // Center text horizontally
        justifyContent: 'center', // Center text vertically
        backgroundColor: 'white', // Background color
    },
    label: {
        color: '#007AFF', // Text color
        fontSize: 16, // Font size
    },
});