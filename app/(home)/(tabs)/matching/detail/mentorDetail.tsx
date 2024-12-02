import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function MentorDetailScreen() {
  const { username, full_name, avatar_url, bio } = useLocalSearchParams();
  const validAvatarUrl = Array.isArray(avatar_url) ? avatar_url[0] : avatar_url;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <View>
          {validAvatarUrl !== 'null' ? (
            <Image
              source={{ uri: validAvatarUrl }}
              accessibilityLabel="Avatar"
              style={[ styles.avatar, styles.image]}
            />
          ) : (
            <View style={[ styles.avatar, styles.noImage]} />
          )}
        </View>

        <Text style={styles.fullName}>{full_name}</Text>
        <Text style={styles.username}>@{username}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.heading}>Bio</Text>
        <Text style={styles.bioText}>{bio}</Text>
      </View>
      <Button
        title="Connect with Mentor"
        // onPress={handleConnectPress}
        color="#007BFF"
      />
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
  image: {
    objectFit: 'cover',
    paddingTop: 0,
  },
  noImage: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'rgb(200, 200, 200)',
    borderRadius: 5,
  },
});
