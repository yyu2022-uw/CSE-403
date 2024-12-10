import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  // Import the image picker
import { spacing } from '@Spacing';
import { sizes } from '@Sizes';
import { TextInput } from 'react-native-gesture-handler';
import { useAuth } from 'providers/AuthProvider';
import { Colors } from '@Colors';
import { supabase } from 'lib/supabase';
import { shouldUseActivityState } from 'react-native-screens';

interface ProfileTagProps {
    fullName: string;
    username: string;
    avatarUrl: string;
    editing: boolean;
}

const ProfileTag: React.FC<ProfileTagProps> = ({ fullName, username, avatarUrl, editing }) => {
    const auth = useAuth();
    const [editableName, setEditableName] = useState(fullName);
    const [editableUsername, setEditableUsername] = useState(username);
    const [selectedImage, setSelectedImage] = useState(avatarUrl);

    useEffect(() => {
        if (!editing) {
            updateProfile({
                fullName: editableName,
                avatarUrl: selectedImage,
                username: editableUsername
            });
        }
    }, [editing]);

    const saveImage = async () => {
        try {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission Denied', 'Sorry, we need camera roll permissions to make this work!');
                return;
            }

            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });

            if (!result.canceled) {
                setSelectedImage(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to access the image gallery. Please try again.');
            console.error("Error picking image:", error);
        }
    };

    const updateProfile = async ({
        fullName,
        avatarUrl,
        username
    }: {
        fullName: string;
        avatarUrl: string;
        username: string;
    }) => {
        if (!auth?.session?.user?.id) {
            Alert.alert("Error", "User ID is undefined. Cannot update profile.");
            console.error("User ID is undefined. Cannot update profile.");
            return;
        }

        // Validate inputs
        if (!fullName.trim() || !username.trim()) {
            Alert.alert("Warning", "All fields must be filled.");
            // console.error("Validation Error: All fields must be filled.");
            setEditableName(fullName);
            setEditableUsername(username);
            setSelectedImage(avatarUrl);
            return;
        }

        try {
            // Check if the username is already taken
            const { data: existingUser, error: fetchError } = await supabase
                .from('profiles')
                .select('id')
                .eq('username', username.trim())
                .single();

            if (fetchError && fetchError.code !== 'PGRST116') {
                throw fetchError; // Unexpected error during username check
            }

            if (existingUser && existingUser.id !== auth?.session?.user.id) {
                Alert.alert("Error", "Username already taken.");
                // console.error("Error: Username already taken.");
                setEditableName(fullName);
                setEditableUsername(username);
                setSelectedImage(avatarUrl);
                return;
            }

            // Update profile
            const { data, error: updateError } = await supabase
                .from('profiles')
                .update([
                    {
                        avatar_url: avatarUrl || "Placeholder Image",
                        full_name: fullName.trim(),
                        username: username.trim(),
                    },
                ])
                .eq('id', auth?.session?.user.id)
                .select();

            if (updateError) {
                throw updateError; // Unexpected error during update
            }

            if (!data || data.length === 0) {
                Alert.alert("Error", "Failed to update profile. Please try again.");
                console.error("Error: Profile update returned no data.");
                return;
            }

            console.log("Profile updated successfully:", data);
        } catch (error) {
            // Alert.alert("Error", `Unexpected error: ${error}`);
            console.error("Unexpected error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={editing ? saveImage : undefined}>
                <Image source={{ uri: avatarUrl }} style={styles.profilePicture} />
            </Pressable>
            <View style={styles.fullNameAndUsername}>
                {editing ? (
                    <TextInput
                        style={[sizes.title, styles.input]}
                        value={editableName}
                        onChangeText={setEditableName}
                        placeholder="Edit Name"
                        placeholderTextColor={Colors.light.placeholderText}
                    />
                ) : (
                    <Text style={[sizes.title, styles.input]}>
                        {fullName || "Your Name"}
                    </Text>
                )}
                {editing ? (
                    <TextInput
                        style={[sizes.plainText, styles.input]}
                        value={editableUsername}
                        onChangeText={setEditableUsername}
                        placeholder="Edit username"
                        placeholderTextColor={Colors.light.placeholderText}
                    />
                ) : (
                    <Text style={[sizes.plainText, styles.input]}>
                        {username || "Your Username"}
                    </Text>
                )}
            </View>
        </View>
    );
};

export default ProfileTag;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing,
    },
    fullNameAndUsername: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: spacing,
    },
    profilePicture: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginRight: spacing,
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flex: 1,
    },
});
