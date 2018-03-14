import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import uuid from "uuid";

const ActivityCard = ({ img, name, description, uuid}) => (
  <View style={styles.card}>
      <Text style={{fontSize: 20}}>{name || 'There is no title'}</Text>
      <Text>{description || 'There is no content'}</Text>
    {/*<Image
      source={{uri: img || 'https://wallpapershome.com/images/pages/pic_v/6505.jpg'}}
    />*/}
  </View>
);

const styles = StyleSheet.create({
  card: {
    flex: 1
  }
});

export default ActivityCard;