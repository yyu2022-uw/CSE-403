import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import { spacing } from '@Spacing'
import React, { useState } from 'react';
import { sizes } from '@Sizes';
import { TextInput } from 'react-native-gesture-handler';
import { useUser } from '@useUser';

interface ProfileTagProps {
    editing: boolean;
}

const ProfileTag: React.FC<ProfileTagProps> = ({ editing }) => {
    const { user, setUser } = useUser();
    const [editableName, setEditableName] = useState(user.name);

    const saveName = () => {
        setUser({ ...user, name: editableName });
    };

    if (!editing) {
        return (
            <View style={styles.container}>
                <Image source={{ uri: user.pictureUrl }} style={styles.profilePicture} />
                <Text style={sizes.title}>{user.name}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Pressable onPress={() => Alert.alert('Image Button Pressed')}>
                    <Image source={{ uri: user.pictureUrl }} style={styles.profilePicture} />
                </Pressable>
                <TextInput
                    style={[sizes.title, styles.input]}
                    value={editableName}
                    onChangeText={setEditableName}
                    onBlur={saveName}  // Save name when input loses focus
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
