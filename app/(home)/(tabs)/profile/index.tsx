// import React, { useEffect, useState } from 'react';
// import { Text, View, ActivityIndicator } from 'react-native';
// import { supabase } from 'lib/supabase';
// import { router, useFocusEffect } from 'expo-router';
// import { useAuth } from '@useAuth';

// export default function Profile() {
//     const id = useAuth()?.session?.user.id;
//     const [user, setUser] = useState<{
//         id: string;
//         username: string;
//         full_name: string;
//         avatar_url: string;
//         bio: string;
//     } | null>(null);
//     const [loading, setLoading] = useState(true);

//     useFocusEffect(() => {
//         if (!id) {
//             console.log("NO ID FOUND")
//             return
//         };

//         const fetchUser = async () => {
//             console.log("FETCHING USER");
//             try {
//                 // Fetch the user's profile details
//                 const { data: user, error } = await supabase
//                     .from('profiles')
//                     .select('id, username, full_name, avatar_url, bio')
//                     .eq('id', id)
//                     .single();

//                 if (error) throw error;

//                 if (user) {
//                     console.log("USER: ", user);
//                     setUser(user);
//                 }
//             } catch (error) {
//                 console.error('Failed to fetch user:', error);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchUser();
//         if (user) {
//             router.push(
//                 `/(home)/(tabs)/profile/detail/profile?id=${user.id}&username=${user.username}&full_name=${user.full_name}&avatar_url=${user.avatar_url}&bio=${user.bio}`
//             );
//         }

//     }); // Dependencies: Runs this effect only when `id` changes.

//     // useFocusEffect(() => {
//     //     fetchUser();
//     //     if (user) {
//     //         router.push(
//     //             `/(home)/(tabs)/profile/detail/profile?id=${user.id}&username=${user.username}&full_name=${user.full_name}&avatar_url=${user.avatar_url}&bio=${user.bio}`
//     //         );
//     //     }
//     // }); // Navigate only when `user` is set.

//     if (loading) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <ActivityIndicator size="large" />
//             </View>
//         );
//     }

//     if (!user) {
//         return (
//             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//                 <Text>No user data found.</Text>
//             </View>
//         );
//     }

//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text>Welcome, {user.full_name}!</Text>
//         </View>
//     );
// }
