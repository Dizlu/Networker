import React from 'react';
import {StyleSheet} from 'react-native';
import uuid from "uuid";
import { ImageBackground, Tile, Title, Subtitle, Heading, Button, Icon, Text, Overlay, Caption } from '@shoutem/ui'


const ActivityCard = ({ img, name, description, uuid}) => (
  <ImageBackground
    styleName="featured"
    source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-4.png' }}
  >
    <Tile>
      <Title styleName="md-gutter-top">{name}</Title>
      <Caption> {description} </Caption>
    </Tile>
  </ImageBackground>
);

const styles = StyleSheet.create({
  card: {
  }
});

export default ActivityCard;
