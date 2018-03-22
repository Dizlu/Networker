import React from 'react';
import {StyleSheet} from 'react-native';
import uuid from "uuid";
import { Image, Tile, Title, Caption, View } from '@shoutem/ui'


const ActivityCard = ({ img, name, description, uuid}) => (
  <Tile>
    <Image
      styleName="large-banner"
      source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-4.png' }}
    />
    <View styleName="content">
      <Title styleName="md-gutter-top">{name}</Title>
      <View styleName="horizontal space-between">
        <Caption> {description.length > 40 ? description.slice(0, 40).trim() + '...' : description} </Caption>
        <Caption> 15:34 </Caption>
      </View>
    </View>
  </Tile>
);

const styles = StyleSheet.create({
  card: {
  }
});

export default ActivityCard;
