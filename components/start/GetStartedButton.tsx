import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@Colors';
import { spacing } from '@Spacing';
import { sizes } from '@Sizes';
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons

let buttonColor = Colors.light.button_blue;
let buttonTextColor = Colors.light.buttonText_blue;

type EditProfileButtonProps = {
    onPress: () => void;
};

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ onPress }) => {

    const buttonColor = Colors.light.button_gray;
    const buttonTextColor = Colors.light.buttonText_gray;
    const buttonText = 'Get Started';

    return (
        <Pressable
            onPress={() => { onPress() }}
            style={[styles.container, { backgroundColor: buttonColor }]}>
            <View style={styles.textContainer}>
                <Text style={[sizes.largePillText, { color: buttonTextColor }]}>{buttonText}</Text>
            </View>
        </Pressable>
    );
};

export default EditProfileButton;

const styles = StyleSheet.create({
    container: {
        width: "90%",
        height: 48,
        borderRadius: 50,
        // margin: "auto",
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        flexDirection: "row",
    },
});
