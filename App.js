/**
 * @flow
 */

import React, { Component } from 'react';
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet, Text, View
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import ActivityCard from "./src/components/activity-card";
import ActivityForm from "./src/components/activity-form";

type Props = {};

class App extends Component<Props> {
  static navigationOptions = {
    title: 'Networker'
  };

  state = {
    formVisible: false,
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
    return <ScrollView style={styles.container}>
      <Button
        style={{margin: 5}}
        onPress={() => this.props.navigation.navigate('Profile')}
        title={'Go to Profile'}
      />
      {!this.state.formVisible && <Button
        onPress={() => this.setState(state => ({...state, formVisible: !this.state.formVisible}))}
        title={'Add new activity'}
      />}
      {this.state.formVisible && <ActivityForm addActivity={form => { this.setState(state => ({ ...state, activities: [...state.activities, form], formVisible: false })); }}/>}
      <FlatList
        data={this.state.activities}
        keyExtractor={(item, index) => item.uuid}
        renderItem={({item}) => <ActivityCard {...item} />}
      />
    </ScrollView>;
  }
}

class Profile extends Component<Props> {
  static navigationOptions = {
    title: 'Profile'
  };

  render () {
    return (
      <View>
        <Button
          onPress={() => this.props.navigation.navigate('Home')}
          title={'Go Home'}
        />
        <Text> Ima profile! </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1
  }
});

export default StackNavigator({
  Home: {
    screen: App
  },
  Profile: {
    screen: Profile
  }
},{
  initialRouteName: 'Home'
});