import { Interest } from '@/data/interests';
import { useAuth } from '@useAuth';
import { supabase } from 'lib/supabase';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';

interface UserInterest extends Interest {
    is_mentor: boolean;
    joined: boolean;
}

const EditCommunities: React.FC = () => {
    const auth = useAuth();

    const [mentorInterests, setMentorInterests] = useState<Interest[] | null | undefined>(
        auth?.mentorInterests
    );

    const [menteeInterests, setMenteeInterests] = useState<Interest[] | null | undefined>(
        auth?.menteeInterests
    );

    const [interests, setInterests] = useState<UserInterest[] | null | undefined>(null);

    // Automatically fill interests when mentorInterests or menteeInterests change
    useEffect(() => {
        const combinedInterests = [
            ...(mentorInterests || []),
            ...(menteeInterests || [])
        ].map((interest) => ({
            ...interest,
            is_mentor: mentorInterests?.some((mentor) => mentor.id === interest.id) || false,
            joined: false,
        }));

        setInterests(combinedInterests);
    }, [mentorInterests, menteeInterests]);

    // Update interests in database when any changes occur
    useEffect(() => {
        const updateUserInterests = async () => {
            if (!auth?.session?.user?.id) {
                console.error("User ID is undefined. Cannot update profile.");
                return;
            }

            // Delete existing records first
            const { data: deletedData, error: deleteError } = await supabase
                .from('user_interests')
                .delete()
                .eq('uid', auth?.user?.id);
            if (deleteError) {
                console.error("Failed to delete interest list:", deleteError);
                return;
            }

            // Filter interests that are joined
            const filteredInterests = interests?.filter((interest) => interest.joined);

            if (filteredInterests?.length === 0) {
                console.warn("No interests with 'joined' status set to true.");
            }

            // Insert new records
            const { data: insertData, error: insertError } = await supabase
                .from('user_interests')
                .upsert(
                    filteredInterests?.map((interest) => ({
                        uid: auth?.user?.id,
                        iid: interest.id,
                        is_mentor: interest.is_mentor
                    }))
                )
                .select();

            if (insertError) {
                console.error("Failed to insert updated interests:", insertError);
            } else {
                console.log("Profile updated successfully:", insertData);
            }
        };

        updateUserInterests();
    }, [interests, auth?.user?.id, mentorInterests, menteeInterests]);

    const handleStatusChange = (id: number, status: 'Mentor' | 'Mentee' | 'Not Joined') => {
        setInterests((prevInterests) =>
            prevInterests?.map((interest) =>
                interest.id === id
                    ? {
                        ...interest,
                        is_mentor: status === 'Mentor',
                        joined: status !== 'Not Joined',
                    }
                    : interest
            )
        );
    };

    const renderInterest = ({ item }: { item: UserInterest }) => {
        // Determine if the interest is marked as a mentor or mentee based on initial values
        const isMentor = item.is_mentor; // Check if it's initially set as a mentor
        const isMentee = item.joined && !isMentor; // Check if it's a mentee based on 'joined' and 'is_mentor'

        return (
            <View style={[styles.interestContainer, { backgroundColor: item.color }]}>
                <Text style={styles.interestText}>{item.icon} {item.name}</Text>
                <View style={styles.statusButtons}>
                    {['Mentor', 'Mentee', 'Not Joined'].map((status) => (
                        <TouchableOpacity
                            key={status}
                            style={[
                                styles.statusButton,
                                // Apply highlight based on the current status
                                (status === 'Mentor' && isMentor) ||
                                    (status === 'Mentee' && isMentee) ||
                                    (status === 'Not Joined' && !item.joined) ||
                                    (status === 'Not Joined' && (item.is_mentor || item.joined))
                                    ? styles.selectedButton
                                    : {},
                            ]}
                            onPress={() => handleStatusChange(item.id, status as 'Mentor' | 'Mentee' | 'Not Joined')}
                        >
                            <Text
                                style={[
                                    styles.statusButtonText,
                                    // Change text color when selected
                                    (status === 'Mentor' && isMentor) ||
                                        (status === 'Mentee' && isMentee) ||
                                        (status === 'Not Joined' && !item.joined)
                                        ? { color: '#fff' }
                                        : {},
                                ]}
                            >
                                {/* Display 'X' instead of 'Not Joined' when the user is joined */}
                                {status === 'Not Joined' && (item.is_mentor || item.joined) ? 'X' : status}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        );
    };


    return (
        <View style={styles.container}>
            <FlatList
                data={interests}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderInterest}
            />
        </View>
    );
};

export default EditCommunities;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    interestContainer: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ddd',
    },
    interestText: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 10,
    },
    statusButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    statusButton: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#aaa',
    },
    selectedButton: {
        backgroundColor: '#007bff',
        borderColor: '#007bff',
    },
    statusButtonText: {
        fontWeight: 'bold',
    },
});
