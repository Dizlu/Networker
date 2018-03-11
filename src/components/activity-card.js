import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const ActivityCard = ({ img, title, desc }) => (
  <View style={styles.card}>
      <Text style={{fontSize: 20}}>{title || 'There is no title'}</Text>
      <Text>{desc || 'There is no content'}</Text>
    <Image
      source={{uri: img || 'https://wallpapershome.com/images/pages/pic_v/6505.jpg'}}
    />

  </View>
);

const styles = StyleSheet.create({
  card: {
    margin: 15,
    flex: 1
  }
});

export default ActivityCard;