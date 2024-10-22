import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import InterestsList from '@/components/profile/InterestsList';
import Bio from '@/components/profile/Bio';
import ProfileTag from '@/components/profile/ProfileTag';
import { spacing } from '@Spacing';
import { sizes } from '@Sizes';
import { ScrollView } from 'react-native-gesture-handler';
import Divider from '@/components/Divider';
import EditProfileButton from '@/components/profile/EditProfileButton';
import FindNewInterestMessage from '@/components/profile/FindNewInterestMessage';

export default function Profile() {
    const [editing, setEditing] = useState(false);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <ProfileTag editing={editing} />
                <Text style={[sizes.subtitle, styles.subtitle]}>
                    Bio
                </Text>
                <Bio editing={editing} />
                <Divider margin={spacing} />
                <View style={styles.interests}>
                    <View style={styles.interestsLists}>
                        <View>
                            <Text style={[sizes.mentorMenteeTitle, styles.mentorMentee]}>
                                Mentoring
                            </Text>
                            <InterestsList />
                        </View>
                        <View>
                            <Text style={[sizes.mentorMenteeTitle, styles.mentorMentee]}>
                                Menteeing
                            </Text>
                            <InterestsList />
                        </View>
                    </View>
                    {editing ? (
                        <View style={styles.newInterestMessage}>
                            <FindNewInterestMessage />
                        </View>
                    ) : null}
                </View>
            </ScrollView>
            <EditProfileButton
                editing={editing}
                setEditing={setEditing}
            />
        </SafeAreaView >
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    subtitle: {
        paddingLeft: spacing
    },
    interests: {
        margin: 'auto',
        alignItems: 'center',
    },
    interestsLists: {
        width: 350,
        paddingTop: spacing / 2,
        flex: 2,
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mentorMentee: {
        paddingBottom: 8
    },
    newInterestMessage: {
        paddingTop: 8
    }
})