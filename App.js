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

export default class App extends Component<Props> {
  state = {
    activities: [
      {
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb8hLheVssxMAPVJFe62-fxm2DTZCrbZdOJ8C5TMD48AwlTVnd',
        name: 'Star wars dude',
        description: 'This is some scary shit star wars dude, don\'t know him though...',
        uuid: '123superhardkey'
      }
    ]
  };

  render() {
    return <View style={styles.container}>
      <ActivityForm addActivity={form => { this.setState(state => ({...state, activities: [...state.activities, form]})); }}/>
      {/*<FlatList
        data={activities}
        renderItem={({item}) => <ActivityCard {...item}/>}
      />*/}
      <FlatList
        data={this.state.activities}
        keyExtractor={(item, index) => item.uuid}
        renderItem={({item}) => <ActivityCard {...item} />}
      />
    </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  }
});
