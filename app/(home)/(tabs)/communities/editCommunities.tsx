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

    const [mentorInterests, setMentorInterests] = useState<Interest[] | null | undefined>(auth?.mentorInterests);
    const [menteeInterests, setMenteeInterests] = useState<Interest[] | null | undefined>(auth?.menteeInterests);
    const [interestsDescription, setInterestsDescription] = useState<Interest[] | null | undefined>(auth?.interests);
    const [interests, setInterests] = useState<UserInterest[] | null | undefined>(null);

    useEffect(() => {
        const combinedInterests = interestsDescription?.map((interest) => ({
            ...interest,
            is_mentor: mentorInterests?.some((mentor) => mentor.id === interest.id) || false,
            joined: mentorInterests?.some((mentor) => mentor.id === interest.id) || menteeInterests?.some((mentee) => mentee.id === interest.id) || false,
        }));

        setInterests(combinedInterests);
    }, [mentorInterests, menteeInterests, interestsDescription]);

    // Update interests in the database
    async function updateUserInterests(updatedInterests: UserInterest[]) {
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
        const filteredInterests = updatedInterests.filter((interest) => interest.joined);

        if (filteredInterests.length === 0) {
            console.warn("No interests with 'joined' status set to true.");
        }

        // Insert new records
        const { data: insertData, error: insertError } = await supabase
            .from('user_interests')
            .upsert(
                filteredInterests.map((interest) => ({
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
    }

    const handleStatusChange = (id: number, status: 'Mentor' | 'Mentee' | 'Not Joined') => {
        const updatedInterests = interests?.map((interest) =>
            interest.id === id
                ? {
                    ...interest,
                    is_mentor: status === 'Mentor',
                    joined: status !== 'Not Joined',
                }
                : interest
        );

        setInterests(updatedInterests); // Immediately update the state

        // Update interests in the database after change
        if (updatedInterests) {
            updateUserInterests(updatedInterests); // Pass the updated state to the database
        }
    };

    const renderInterest = ({ item }: { item: UserInterest }) => {
        // Determine if the interest is marked as a mentor or mentee based on initial values
        const isMentor = item.is_mentor;
        const isMentee = item.joined && !isMentor;

        return (
            <View style={[styles.interestContainer, { backgroundColor: item.color }]}>
                <Text style={styles.interestText}>{item.icon} {item.name}</Text>
                <View style={styles.statusButtons}>
                    {['Mentor', 'Mentee'].map((status) => (
                        <TouchableOpacity
                            key={status}
                            style={[
                                styles.statusButton,
                                // Apply highlight based on the current status
                                (status === 'Mentor' && isMentor) ||
                                    (status === 'Mentee' && isMentee)
                                    ? styles.selectedButton
                                    : {},
                            ]}
                            onPress={() => handleStatusChange(item.id, status as 'Mentor' | 'Mentee')}
                        >
                            <Text
                                style={[
                                    styles.statusButtonText,
                                    // Change text color when selected
                                    (status === 'Mentor' && isMentor) ||
                                        (status === 'Mentee' && isMentee)
                                        ? { color: '#fff' }
                                        : {},
                                ]}
                            >
                                {status}
                            </Text>
                        </TouchableOpacity>
                    ))}
                    <TouchableOpacity
                        key="Not Joined"
                        style={[
                            styles.statusButton,
                            !item.joined ? styles.selectedButton : {},
                        ]}
                        onPress={() => handleStatusChange(item.id, 'Not Joined')}
                    >
                        <Text
                            style={[
                                styles.statusButtonText,
                                !item.joined ? { color: '#fff' } : {},
                            ]}
                        >
                            X
                        </Text>
                    </TouchableOpacity>
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
