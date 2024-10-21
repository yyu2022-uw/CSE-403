import { StyleSheet, Text, View, Image } from 'react-native';
import { spacing } from '@Spacing'
import React from 'react';
import { sizes } from '@Sizes';

interface ProfileTagProps {
    pictureUrl: string;
    name: string;
}

const ProfileTag: React.FC<ProfileTagProps> = ({ pictureUrl, name }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: pictureUrl }} style={styles.profilePicture} />
            <Text style={sizes.title}>{name}</Text>
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
        borderRadius: 25, // circle
        marginRight: spacing
    },
});
