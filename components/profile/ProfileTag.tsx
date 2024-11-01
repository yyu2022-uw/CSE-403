import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  // Import the image picker
import { spacing } from '@Spacing'
import React, { useState } from 'react';
import { sizes } from '@Sizes';
import { TextInput } from 'react-native-gesture-handler';
import { useAuth } from '@useAuth';
import { Colors } from '@Colors';
import { supabase } from 'lib/supabase';

interface ProfileTagProps {
    username: string;
    avatarUrl: string;
    editing: boolean;
}

const ProfileTag: React.FC<ProfileTagProps> = ({ username, avatarUrl, editing }) => {
    const { session } = useAuth();
    const [editableName, setEditableName] = useState(username);
    const [selectedImage, setSelectedImage] = useState(avatarUrl);

    async function updateName({
        username,
    }: {
        username: string
    }) {
        try {
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                username,
                updated_at: new Date(),
            }

            const { error } = await supabase.from('profiles').upsert(updates)

            if (error) {
                throw error
            }
        } catch (error) {
            if (error instanceof Error) {
                Alert.alert(error.message)
            }
        } finally {
        }
    }

    return (
        <View style={styles.container}>
            <Pressable onPress={editing ? saveImage : undefined}>
                <Image source={{ uri: selectedImage }} style={styles.profilePicture} />
            </Pressable>
            {editing ? (
                <TextInput
                    style={[sizes.title, styles.input]}
                    value={editableName}
                    onChangeText={setEditableName}
                    // onBlur={saveName}  // Save name when input loses focus
                    placeholder="Edit Name"
                    placeholderTextColor={Colors.light.placeholderText}
                />
            ) : (
                <Text style={[sizes.title, styles.input]}>
                    {editableName || "Your Name"}
                </Text>
            )}
        </View>
    );
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
        borderRadius: 50, // circle
        marginRight: spacing
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flex: 1,
    }
});
