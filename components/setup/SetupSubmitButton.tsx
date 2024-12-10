import { Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Colors } from '@Colors';
import { spacing } from '@Spacing';
import { sizes } from '@Sizes';
import { Ionicons } from '@expo/vector-icons'; // Import the Ionicons

type SetupSubmitButtonProps = {
  onClick: () => void;
};

const SetupSubmitButton: React.FC<SetupSubmitButtonProps> = ({ onClick }) => {
  const [isPressed, setIsPressed] = useState(false);

  const buttonColor = Colors.light.button_pink
  const buttonTextColor = Colors.light.buttonText_pink;
  const buttonText = 'Submit';
  // const buttonIcon = 'person-add';

  return (
    <Pressable
      onPress={() => {
        onClick();
      }}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      style={[styles.container, { backgroundColor: buttonColor }]}>
      <View style={styles.textContainer}>
        {/* <Ionicons name={buttonIcon} size={24} color={buttonTextColor} style={styles.icon} /> */}
        <Text style={[sizes.largePillText, { color: buttonTextColor }]}>{buttonText}</Text>
      </View>
    </Pressable>
  );
};

export default SetupSubmitButton;

const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: 48,
    borderRadius: 50,
    marginTop: spacing * 2,
    marginBottom: spacing,
    margin: "auto",
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    flexDirection: "row",
  },
  icon: {
    paddingRight: 8,
    fontSize: 30,
  },
});
