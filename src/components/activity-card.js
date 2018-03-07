import React from 'react';
import {Card, CardContent, CardCover, Paragraph, Title} from "react-native-paper";
import { StyleSheet } from 'react-native';

const ActivityCard = ({ img, title, desc }) => (
  <Card style={styles.card}>
    <CardContent>
      <Title style={{fontSize: 20}}>{title || 'There is no title'}</Title>
      <Paragraph>{desc || 'There is no content'}</Paragraph>
    </CardContent>
    <CardCover
      source={{uri: img || 'https://wallpapershome.com/images/pages/pic_v/6505.jpg'}}
    />
  </Card>
);

const styles = StyleSheet.create({
  card: {
    margin: 10
  }
});

export default ActivityCard;