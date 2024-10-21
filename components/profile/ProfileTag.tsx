import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import { spacing } from '@Spacing'
import React, { useState } from 'react';
import { sizes } from '@Sizes';
import { TextInput } from 'react-native-gesture-handler';

interface ProfileTagProps {
    editing: boolean;
    pictureUrl: string;
    name: string;
}

const ProfileTag: React.FC<ProfileTagProps> = ({ editing, pictureUrl, name }) => {
    const [editableName, setEditableName] = useState(name);

    if (!editing) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: pictureUrl }} style={styles.profilePicture} />
                <Text style={sizes.title}>{name}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Pressable onPress={() => Alert.alert('Image Button Pressed')}>
                    <Image source={{ uri: pictureUrl }} style={styles.profilePicture} />
                </Pressable>
                <TextInput
                    style={[sizes.title, styles.input]}
                    value={editableName}
                    onChangeText={setEditableName}
                    placeholder="Edit Name"
                />
            </View>
        );
    };
};

export default ProfileTag;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 25, // circle
        marginRight: spacing
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flex: 1,
    }
});
