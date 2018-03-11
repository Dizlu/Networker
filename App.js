/**
 * @flow
 */

import React, { Component } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet
} from 'react-native';
import ActivityCard from "./src/components/activity-card";
import ActivityForm from "./src/components/activity-form";
import ActivityMap from "./src/components/activity-map";

type Props = {};
const activities = [
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb8hLheVssxMAPVJFe62-fxm2DTZCrbZdOJ8C5TMD48AwlTVnd',
    title: 'Star wars dude',
    desc: 'This is some scary shit star wars dude, don\'t know him though...'
  }, {

  }
];
/*
Structure of single activity:
 - Name of activity
 - Description
 - Time
 - Category
 - Location (Google Maps)
 */

const formData = {

};

export default class App extends Component<Props> {
  render() {
    let counter = 0;
    return <ScrollView style={styles.container}>
      <ActivityForm />
      <ActivityMap />
      <FlatList
        data={activities}
        keyExtractor={(item) => counter++}
        renderItem={({item}) => <ActivityCard {...item}/>}
      />
    </ScrollView>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});
