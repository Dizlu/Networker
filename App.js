/**
 * @flow
 */

import React, { Component } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';
import {
  Card, CardContent, CardCover, Paragraph, Title, Toolbar,
  ToolbarContent
} from "react-native-paper";
import ActivityCard from "./src/components/activity-card";
import ActivityForm from "./src/components/activity-form";

type Props = {};
const activities = [
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb8hLheVssxMAPVJFe62-fxm2DTZCrbZdOJ8C5TMD48AwlTVnd',
    title: 'Star wars dude',
    desc: 'This is some scary shit star wars dude, don\'t know him though...'
  }, {

  },
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb8hLheVssxMAPVJFe62-fxm2DTZCrbZdOJ8C5TMD48AwlTVnd',
    title: 'Star wars dude',
    desc: 'This is some scary shit star wars dude, don\'t know him though...'
  }
];

export default class App extends Component<Props> {
  render() {
    return <View style={styles.container}>
      <Toolbar>
        <ToolbarContent
          title="Networker"
        />
      </Toolbar>
      <ActivityForm />
      <FlatList
        data={activities}
        renderItem={({item}) => <ActivityCard {...item}/>}
      />
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
