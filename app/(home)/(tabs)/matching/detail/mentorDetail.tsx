import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MentorDetailScreen() {
  const { username, full_name, avatar_url, bio } = useLocalSearchParams();
  console.log(username)

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        {/* {avatar_url && (
          <Image source={{ uri: avatar_url }} style={styles.avatar} />
        )} */}
        <Text style={styles.fullName}>{full_name}</Text>
        <Text style={styles.username}>@{username}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.heading}>Bio</Text>
        <Text style={styles.bioText}>{bio}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  fullName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
  },
  detailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  bioText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
});
