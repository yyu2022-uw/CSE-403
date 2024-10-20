import React from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import InterestsList from '@/components/profile/InterestsList';
import Bio from '@/components/profile/Bio';
import ProfileTag from '@/components/profile/ProfileTag';
import { padding } from '@Spacing';
import { sizes } from '@Sizes';
import { ScrollView } from 'react-native-gesture-handler';

export default function Profile() {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ProfileTag
                    pictureUrl='https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-Download-Image.png'
                    name='Bob' />
                <Text style={[sizes.subtitle, styles.subtitle]}>
                    Bio
                </Text>
                <Bio text={"Hi, nice to meet you!"} />
                <InterestsList />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    subtitle: {
        paddingLeft: padding
    }
})