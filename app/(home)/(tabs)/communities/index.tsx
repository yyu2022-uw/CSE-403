import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Interest } from '@/data/interests';
import { useAuth } from '@useAuth';
import { supabase } from 'lib/supabase';

interface UserInterest extends Interest {
    is_mentor: boolean;
    joined: boolean;
}

function EditCommunities() {
    const auth = useAuth();

    const [interests, setInterests] = useState<UserInterest[] | null | undefined>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true); // Start loading

        const combinedInterests = auth?.interests?.map((interest) => ({
            ...interest,
            is_mentor: auth?.mentorInterests?.some((mentor) => mentor.id === interest.id) || false,
            joined: auth?.mentorInterests?.some((mentor) => mentor.id === interest.id) || auth?.menteeInterests?.some((mentee) => mentee.id === interest.id) || false,
        }));

        setInterests(combinedInterests || []);
        setLoading(false); // End loading
    }, [auth?.mentorInterests, auth?.menteeInterests, auth?.interests]);

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
                    is_mentor: interest.is_mentor,
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
                                (status === 'Mentor' && isMentor) || (status === 'Mentee' && isMentee)
                                    ? styles.selectedButton
                                    : {},
                            ]}
                            onPress={() => handleStatusChange(item.id, status as 'Mentor' | 'Mentee')}
                        >
                            <Text
                                style={[
                                    styles.statusButtonText,
                                    (status === 'Mentor' && isMentor) || (status === 'Mentee' && isMentee)
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
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={interests}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderInterest}
                />
            )}
        </View>
    );
};

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

export default EditCommunities;
