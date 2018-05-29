// @flow
import React, { Component } from 'react';
import { Screen, ListView, Text, Button, Title, Caption } from '@shoutem/ui';
import XMLParse from '../../../services/XMLParse';
import ActivityCard from '../activity-card';

import firebase from 'react-native-firebase';

type Props = {
  navigation: Object,
  link: string
};

type activity = {
  img: string,
  name: string,
  description: string,
  uuid: string
};

type State = {
  activities: Array<activity>,
  firestoreActivity: Object
};

type xmlItem = {
  rss: {
    channel: {
      item: Object
    }
  }
};

class Category extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Title>Networker</Title>,
      headerRight: (
        <Button
          styleName="textual"
          onPress={() => navigation.navigate('Profile')}
        >
          <Text>Profile</Text>
        </Button>
      )
    };
  };

  fetchEventsFromFirestore(collection = 'Events', limit = 50) {
    firebase
      .firestore()
      .collection(collection)
      .limit(limit)
      .get()
      .then(data => {
        const mappedDocs = data.docs.map(doc => doc.data());
        this.setState(state => ({
          ...state,
          activities: [...mappedDocs, ...state.activities]
        }));
      });
  }

  componentDidMount() {
    const rssLink = this.props.link;

    XMLParse(rssLink)
      .then((parsedData: xmlItem) => {
        this.setState(state => ({
          activities: [...state.activities, ...parsedData.rss.channel.item]
        }));
      })
      .catch(err => console.log('Request for XML failed', err));
    this.fetchEventsFromFirestore();
  }

  state = {
    activities: []
  };

  goToDetail = event => {
    this.props.navigation.navigate('EventDetail', event);
  };

  renderRow = item => <ActivityCard {...item} goToDetail={this.goToDetail} />;

  render() {
    return (
      <Screen>
        <Button
          styleName="textual"
          onPress={() => {
            this.props.navigation.navigate('EventForm', {
              addItem: item =>
                this.setState(state => ({
                  ...state,
                  activities: [...state.activities, item]
                }))
            });
          }}
        >
          <Text>Add new event!</Text>
        </Button>
        <ListView data={this.state.activities} renderRow={this.renderRow} />
      </Screen>
    );
  }
}

export default Category;
