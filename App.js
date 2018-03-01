/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Card, CardContent, CardCover, Paragraph, Title, Toolbar,
  ToolbarContent
} from "react-native-paper";

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View>
        <Toolbar>
          <ToolbarContent
            title="Welcome Page"
            subtitle="Go for a quick tour around app"
          />
        </Toolbar>
        <Card style={styles.card}>
          <CardContent>
            <Title style={{fontSize: 30}}>Card title</Title>
            <Paragraph>Card content is very important</Paragraph>
          </CardContent>
          <CardCover
            source={{uri: 'https://wallpapershome.com/images/pages/pic_v/6505.jpg'}}
            style={{height: '80%'}}
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  card: {
    margin: 15
  }
});
