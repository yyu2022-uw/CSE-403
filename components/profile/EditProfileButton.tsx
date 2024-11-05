import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '@Colors';
import { spacing } from '@Spacing';
import { sizes } from '@Sizes';
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons

let buttonColor = Colors.light.button;
let buttonTextColor = Colors.light.buttonText;

type EditProfileButtonProps = {
    editing: boolean;
    setEditing: (editing: boolean) => void;
    onUpdate: () => void;
};

const EditProfileButton: React.FC<EditProfileButtonProps> = ({ editing, setEditing, onUpdate }) => {

    const buttonColor = !editing ? Colors.light.button : Colors.light.buttonSave;
    const buttonTextColor = !editing ? Colors.light.buttonText : Colors.light.buttonSaveText;
    const buttonText = !editing ? 'Edit Profile' : 'Save Edits';
    const buttonIcon = !editing ? 'pencil' : 'save';

    return (
        <Pressable
            onPress={() => {
                if (editing) {
                    onUpdate(); // Call the update function if in editing mode
                }
                setEditing(!editing)
            }}
            style={[styles.container, { backgroundColor: buttonColor }]}>
            <View style={styles.textContainer}>
                <Ionicons name={buttonIcon} size={24} color={buttonTextColor} style={styles.icon} />
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
