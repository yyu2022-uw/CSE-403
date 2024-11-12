import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';  // Import the image picker
import { spacing } from '@Spacing';
import { sizes } from '@Sizes';
import { TextInput } from 'react-native-gesture-handler';
import { useAuth } from 'providers/AuthProvider';
import { Colors } from '@Colors';
import { supabase } from 'lib/supabase';

interface ProfileTagProps {
    editing: boolean;
}

const ProfileTag: React.FC<ProfileTagProps> = ({ editing }) => {
    const auth = useAuth();
    const [editableName, setEditableName] = useState(auth?.profile?.full_name);
    const [selectedImage, setSelectedImage] = useState(auth?.profile?.avatar_url);
    const [editableUsername, setEditableUsername] = useState(auth?.profile?.username);

    // Watch for `editing` to change and trigger `updateProfile` when it becomes 0 (false)
    useEffect(() => {
        if (!editing) {
            updateProfile({
                fullName: editableName,
                avatarUrl: selectedImage,
                username: editableUsername
            });
        }
    }, [editing]);  // Only runs when `editing` changes

    // Function to pick an image from the gallery
    const saveImage = async () => {
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
            console.error("User ID is undefined. Cannot update profile.");
            return;
        }

        const { data, error } = await supabase
            .from('profiles')
            .update([
                { avatar_url: avatarUrl, full_name: fullName, username },
            ])
            .eq('id', auth?.session?.user.id)
            .select();

        if (error) console.error(error);
        else console.log("Profile updated successfully:", data);
    };

    return (
        <View style={styles.container}>
            <Pressable onPress={editing ? saveImage : undefined}>
                <Image source={{ uri: selectedImage }} style={styles.profilePicture} />
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
                        {editableName || "Your Name"}
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
                        {editableUsername || "Your Username"}
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
