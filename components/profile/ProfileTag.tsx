import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  // Import the image picker
import { spacing } from '@Spacing'
import React, { useState } from 'react';
import { sizes } from '@Sizes';
import { TextInput } from 'react-native-gesture-handler';
import { useAuth } from 'providers/AuthProvider';
import { Colors } from '@Colors';
import { supabase } from 'lib/supabase';

interface ProfileTagProps {
    fullName: string;
    avatarUrl: string;
    editing: boolean;
}

const ProfileTag: React.FC<ProfileTagProps> = ({ fullName, avatarUrl, editing }) => {

    if (!avatarUrl) {
        avatarUrl = 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png'
    }

    const { session } = useAuth();
    const [editableName, setEditableName] = useState(fullName);
    const [selectedImage, setSelectedImage] = useState(avatarUrl);

    async function updateName({
        fullName,
    }: {
        fullName: string
    }) {
        try {
            if (!session?.user) throw new Error('No user on the session!')

            const updates = {
                id: session?.user.id,
                fullName,
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

    // Function to pick an image from the gallery
    const saveImage = async () => {
        // Ask for permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
            return;
        }

        // Open image picker
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            // Update the selected image
            setSelectedImage(result.assets[0].uri);
            // setUser({ ...user, pictureUrl: result.assets[0].uri });  // Save to context
        }
    };

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
