import React, { Component } from 'React';
import {
  Screen,
  Text,
  Title,
  Button,
  View,
  Tile,
  Caption,
  Icon,
  ImageBackground,
  InlineGallery,
  Subtitle,
  Divider,
  TouchableOpacity
} from '@shoutem/ui';
import { ActivityIndicator, ScrollView } from 'react-native';
import ActivityMap from '../activity-map';

import firebase from 'react-native-firebase';

type State = {
  imageLoaded: boolean,
  author: string,
  category: string,
  description: string,
  end: Date,
  goToDetail: () => void,
  id: string,
  images: Array,
  location: {
    longtitude: number,
    latitude: number
  },
  peopleGoing: number,
  peopleInterested: number,
  start: Date
};

type Props = {
  navigation: {
    state: {
      params: {
        description: string,
        image: string,
        location: {
          latitude: number,
          longitude: number
        }
      }
    }
  }
};

export default class EventDetail extends Component<State, Props> {
  static navigationOptions = props => {
    const { navigation } = props;
    return {
      headerTitle: <Title>Event details</Title>,
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

  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      ...props.navigation.state.params
    };
  }

  initialCoordinates = {
    latitude: 51.2465,
    longitude: 22.5684,
    latitudeDelta: 0.0622,
    longitudeDelta: 0.0421
  };

  markers = [
    {
      coordinate: {
        latitude: 51.2365,
        longitude: 22.5584
      },
      title: 'Test marker',
      description: 'Test marker longer description'
    }
  ];

  addPersonGoing(ref) {
    firebase
      .firestore()
      .runTransaction(async transaction => {
        const doc = await transaction.get(ref);

        if (!doc.exists) {
          console.log('No document of given event!');
          return undefined;
        }

        const newEvent = {
          ...doc.data(),
          peopleGoing: doc.data().peopleGoing + 1
        };

        transaction.update(ref, newEvent);
        return newEvent;
      })
      .then(newEvent => {
        console.log(
          `Transaction successfully committed and new event is:`,
          newEvent
        );
        this.setState(state => ({
          ...state,
          peopleGoing: newEvent.peopleGoing
        }));
      })
      .catch(error => {
        console.log('Transaction failed: ', error);
      });
  }

  render() {
    const navigation = this.props.navigation;
    const images =
      this.state.images &&
      this.state.images.map(image => ({
        source: {
          uri: image
        }
      }));
    const ref = firebase
      .firestore()
      .collection('Events')
      .doc(this.state.id);
    console.log(this.state);
    return (
      <ScrollView>
        <Tile>
          <Title
            style={{
              marginTop: 30,
              marginBottom: 20,
              fontSize: 25,
              textAlign: 'center',
              alignSelf: 'center'
            }}
          >
            {this.state.name}
          </Title>
          <Text style={{ margin: 15 }}>{this.state.description}</Text>
          <Tile style={{ margin: 15 }}>
            <TouchableOpacity style={{ padding: 5 }}>
              <Subtitle style={{ fontSize: 15 }}>
                People interested: {this.state.peopleInterested}
              </Subtitle>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ padding: 5 }}
              onPress={() => this.addPersonGoing(ref)}
            >
              <Subtitle style={{ fontSize: 15 }}>
                People going: {this.state.peopleGoing}
              </Subtitle>
            </TouchableOpacity>
          </Tile>
          <Divider />
          <Button
            styleName="dark"
            onPress={() =>
              navigation.navigate('ActivityMap', {
                coordinates: this.initialCoordinates,
                markers: [
                  {
                    coordinate: this.state.location,
                    title: this.state.name,
                    description: this.state.description
                  }
                ]
              })
            }
          >
            <Text>See location on map</Text>
          </Button>
          {images && (
            <Title style={{ fontSize: 20, margin: 15 }}>Event gallery</Title>
          )}
        </Tile>
        <InlineGallery data={images ? images : []} />
      </ScrollView>
    );
  }
}
