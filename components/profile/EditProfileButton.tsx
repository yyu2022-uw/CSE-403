import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@Colors';
import { spacing } from '@Spacing';
import { sizes } from '@Sizes';
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons

const EditProfileButton = () => {
    return (
        <View style={styles.container}>
            <Pressable>
                <View style={styles.textContainer}>
                    <Ionicons name="pencil" size={24} color={Colors.light.buttonText} style={styles.icon} />
                    <Text style={[sizes.largePillText, { color: Colors.light.buttonText }]}>Edit Profile</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default EditProfileButton;

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 48,
        borderRadius: 50,
        backgroundColor: Colors.light.button,
        marginBottom: spacing,
        margin: "auto",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: "row",
    },
    icon: {
        paddingRight: 8,
        fontSize: 30,
    },
});
