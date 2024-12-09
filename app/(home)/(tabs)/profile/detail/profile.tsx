import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, ActivityIndicator, SafeAreaView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { Interest } from '@/data/interests';
import { supabase } from 'lib/supabase';
import InterestsList from '@/components/profile/InterestsList';
import { sizes } from '@Sizes';
import { spacing } from '@Spacing';
import Divider from '@/components/Divider';
import ProfileTag from '@/components/profile/ProfileTag';
import Bio from '@/components/profile/Bio';
import FindNewInterestMessage from '@/components/profile/FindNewInterestMessage';
import EditProfileButton from '@/components/profile/EditProfileButton';

export default function ProfileScreen() {
    const { id, username, full_name, avatar_url, bio } = useLocalSearchParams();
    const validAvatarUrl = Array.isArray(avatar_url) ? avatar_url[0] : avatar_url;
    const [editing, setEditing] = useState(false);
    const [mentorInterests, setMentorInterests] = useState<Interest[]>();
    const [menteeInterests, setMenteeInterests] = useState<Interest[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchMentorInterests = async () => {
                try {
                    const { data, error } = await supabase
                        .from('user_interests')
                        .select('interests(*)')
                        .eq('uid', id)
                        .eq('is_mentor', true);

                    if (error) throw error;
                    const interests: Interest[] = data.map((item: any) => ({
                        id: item.interests.id,
                        name: item.interests.name,
                        color: item.interests.color,
                        icon: item.interests.icon,
                    }));
                    setMentorInterests(interests);
                    console.log("Mentor interests: " + interests)
                } catch (error) {
                    console.error('Failed to fetch mentor interests:', error);
                } finally {
                    setLoading(false);
                }
            };

            const fetchMenteeInterests = async () => {
                try {
                    const { data, error } = await supabase
                        .from('user_interests')
                        .select('interests(*)')
                        .eq('uid', id)
                        .eq('is_mentor', false);

                    if (error) throw error;
                    const interests: Interest[] = data.map((item: any) => ({
                        id: item.interests.id,
                        name: item.interests.name,
                        color: item.interests.color,
                        icon: item.interests.icon,
                    }));
                    setMenteeInterests(interests || []);
                } catch (error) {
                    console.error('Failed to fetch mentee interests:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchMentorInterests();
            fetchMenteeInterests();
        }
    }, [id]);

    function handleInterestMessageClicked(): void {
        setEditing(false); // Stop editing when moving away from the page
    }

    return (

        <SafeAreaView style={styles.container}>
            {/* <SafeAreaView> */}
            <ScrollView>
                <ProfileTag
                    fullName={full_name ? full_name.toString() : ""}
                    username={username ? username.toString() : ""}
                    avatarUrl={avatar_url ? avatar_url.toString() : ""}
                    editing={editing}
                />
                <Text style={[sizes.subtitle, styles.subtitle]}>
                    Bio
                </Text>
                <Bio bio={bio ? bio.toString() : ""} editing={editing} />
                <Divider margin={spacing} />
                <View style={styles.interests}>
                    <View style={styles.interestsLists}>
                        <View>
                            <Text style={[sizes.mentorMenteeTitle, styles.mentorMentee]}>
                                Mentoring
                            </Text>
                            {loading ?
                                <View style={{ width: 150, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="small" />
                                </View> :
                                <InterestsList interests={mentorInterests} onUpdate={() => { }} />
                            }
                        </View>
                        <View>
                            <Text style={[sizes.mentorMenteeTitle, styles.mentorMentee]}>
                                Menteeing
                            </Text>
                            {loading ?
                                <View style={{ width: 150, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                    <ActivityIndicator size="small" />
                                </View> :
                                <InterestsList interests={menteeInterests} onUpdate={() => { }} />
                            }
                        </View>
                    </View>
                    {editing ? (
                        <View style={styles.newInterestMessage}>
                            <FindNewInterestMessage onClick={handleInterestMessageClicked} />
                        </View>
                    ) : null}
                </View>
                <Divider margin={spacing} />
                <View style={styles.userId}>
                    <Text>User ID: {id}</Text>
                </View>
            </ScrollView>
            <EditProfileButton
                editing={editing}
                setEditing={setEditing}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
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
    },
    userId: {
        alignItems: 'center',
    }
})
