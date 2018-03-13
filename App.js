/**
 * @flow
 */

import React, { Component } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet, View
} from 'react-native';
import ActivityCard from "./src/components/activity-card";
import ActivityForm from "./src/components/activity-form";

type Props = {};
let activities = [
  {
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb8hLheVssxMAPVJFe62-fxm2DTZCrbZdOJ8C5TMD48AwlTVnd',
    name: 'Star wars dude',
    description: 'This is some scary shit star wars dude, don\'t know him though...'
  }
];


export default class App extends Component<Props> {
  render() {
    return <ScrollView style={styles.container}>
      <ActivityForm addActivity={form => activities = [...activities, ...form]}/>
      {/*<FlatList
        data={activities}
        renderItem={({item}) => <ActivityCard {...item}/>}
      />*/}
       {activities.map( item => <ActivityCard {...item} />)}
    </ScrollView>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    paddingTop: 30,
    flex: 1
  }
});
