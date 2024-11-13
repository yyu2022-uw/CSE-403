import { View, Text, StyleSheet, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { spacing } from '@Spacing'
import { sizes } from '@Sizes'
import { Colors } from '@Colors';
import { useAuth } from '@useAuth';
import { supabase } from 'lib/supabase';

interface BioProps {
    editing: boolean;
}

export default function Bio({ editing }: BioProps) {
    const auth = useAuth();
    const [editableBioText, setEditableBioText] = useState(auth?.profile?.bio);

    // Watch for `editing` to change and trigger `updateProfile` when it becomes 0 (false)
    useEffect(() => {
        if (!editing) {
            updateProfile({
                bio: editableBioText,
            });
        }
    }, [editing]);  // Only runs when `editing` changes

    const updateProfile = async ({
        bio,
    }: {
        bio: string;
    }) => {
        if (!auth?.session?.user?.id) {
            console.error("User ID is undefined. Cannot update profile.");
            return;
        }
        try {
            const { data } = await supabase
            .from('profiles')
            .update([
                { bio },
            ])
            .eq('id', auth?.session?.user.id)
            .select();
            console.log("Profile updated successfully:", data);
        } catch (error) {
            console.error("Error in Bio:", error);
        }

    };

    if (!editing) {
        return (
            <View style={styles.container}>
                <Text style={sizes.plainText}>{editableBioText}</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <TextInput
                    style={[sizes.plainText, styles.input]}
                    value={editableBioText}
                    onChangeText={setEditableBioText}
                    placeholder="Write your biography..."
                    placeholderTextColor={Colors.light.placeholderText}
                />
            </View>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // height: 100,
        paddingLeft: spacing
    },
    input: {
        borderBottomWidth: 1,
        borderColor: '#ccc',
        flex: 1,
    }
})