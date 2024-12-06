import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { supabase } from 'lib/supabase';
import { router, Slot, useFocusEffect } from 'expo-router';
import { useAuth } from '@useAuth';

export default function Profile() {
    const id = useAuth()?.session?.user.id;
    const [user, setUser] = useState<{
        id: string;
        username: string;
        full_name: string;
        avatar_url: string;
        bio: string;
    } | null>(null);
    const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     console.log("WWW");

    //     const fetchUser = async () => {
    //         console.log("FETCHING USER");
    //         try {
    //             const { data: user, error } = await supabase
    //                 .from('profiles')
    //                 .select('id, username, full_name, avatar_url, bio')
    //                 .eq('id', id)
    //                 .single();

    //             if (error) throw error;
    //             setUser(user);
    //             setLoading(false);
    //         } catch (error) {
    //             console.error('Failed to fetch user:', error);
    //             setLoading(false);
    //         }
    //     };

    //     fetchUser();
    // }, []);


    // useFocusEffect(() => {
    //     // React.useCallback(() => {
    //     if (!id) {
    //         console.log("NO ID FOUND");
    //         return;
    //     }

    //     const fetchUser = async () => {
    //         console.log("FETCHING USER");
    //         try {
    //             const { data: user, error } = await supabase
    //                 .from('profiles')
    //                 .select('id, username, full_name, avatar_url, bio')
    //                 .eq('id', id)
    //                 .single();

    //             if (error) throw error;
    //             setUser(user);
    //         } catch (error) {
    //             console.error('Failed to fetch user:', error);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchUser();
    //     // }, [id])
    // });

    // useFocusEffect(
    //     useCallback(() => {
    //         console.log("WWW");

    //         const fetchUser = async () => {
    //             console.log("FETCHING USER");
    //             try {
    //                 const { data: user, error } = await supabase
    //                     .from('profiles')
    //                     .select('id, username, full_name, avatar_url, bio')
    //                     .eq('id', id)
    //                     .single();

    //                 if (error) throw error;
    //                 setUser(user);
    //                 setLoading(false);
    //             } catch (error) {
    //                 console.error('Failed to fetch user:', error);
    //                 setLoading(false);
    //             }
    //         };

    //         fetchUser();
    //     }, [id]) // Adding `id` ensures it re-runs when `id` changes.
    // );

    // useFocusEffect(
    //     useCallback(() => {
    //         console.log("WWW");

    //         const fetchUser = async () => {
    //             console.log("FETCHING USER");
    //             try {
    //                 const { data: user, error } = await supabase
    //                     .from('profiles')
    //                     .select('id, username, full_name, avatar_url, bio')
    //                     .eq('id', id)
    //                     .single();

    //                 if (error) throw error;
    //                 setLoading(false);
    //             } catch (error) {
    //                 console.error('Failed to fetch user:', error);
    //                 setLoading(false);
    //             }
    //         };

    //         fetchUser();
    //     }, [id]) // Fresh state and ID every time the page focuses.
    // );

    useFocusEffect(
        useCallback(() => {
            console.log("WWW");
            const controller = new AbortController();

            const fetchUser = async () => {
                console.log("FETCHING USER");
                try {
                    const { data: user, error } = await supabase
                        .from('profiles')
                        .select('id, username, full_name, avatar_url, bio')
                        .eq('id', id)
                        .single();

                    if (error) throw error;
                    if (!controller.signal.aborted) {
                        setUser(user);
                        setLoading(false);
                    }
                } catch (error) {
                    if (!controller.signal.aborted) {
                        console.error('Failed to fetch user:', error);
                        setLoading(false);
                    }
                }
            };

            fetchUser();

            return () => {
                controller.abort(); // Cancel fetch on unmount or re-run
            };
        }, [id])
    );


    useEffect(() => {
        if (user) {
            console.log("PUSHING INDEX")
            router.push(
                `/(home)/(tabs)/profile/detail/profile?id=${user.id}&username=${user.username}&full_name=${user.full_name}&avatar_url=${user.avatar_url}&bio=${user.bio}`
            );
        }
    }, [user]);


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    } else {
        return (
            <Slot />
        )
    }

    //     return (
    //         <Slot />
    //     )
}