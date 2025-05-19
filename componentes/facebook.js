import React from 'react';
import { View, Text, TouchableOpacity, Linking, StyleSheet, Image } from 'react-native';

const TikTokLink = () => {
  const handlePress = () => {
    Linking.openURL('https://www.tiktok.com/@angie.gonzaga?_t=ZS-8wRXUfd9LBE&_r=1');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.iconContainer} activeOpacity={0.7}>
        <Image
          source={require('../assets/tiktok.png')}
          style={styles.icon}
        />
      </TouchableOpacity>
      <Text style={styles.description}>
        Síguenos en TikTok para ver más diseños en video.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  iconContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 28,
    height: 28,
    resizeMode: 'contain',
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default TikTokLink;
