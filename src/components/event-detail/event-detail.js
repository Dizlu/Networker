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
  ImageBackground
} from '@shoutem/ui';
import { ActivityIndicator } from 'react-native';
import ActivityMap from '../activity-map';

type State = {
  imageLoaded: boolean
};

type Props = {
  navigation: {
    state: {
      params: {
        description: string,
        image: string
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

  state = {
    imageLoaded: false
  };

  initialCoordinates = {
    latitude: 51.2465,
    longitude: 22.5684,
    latitudeDelta: 0.0422,
    longitudeDelta: 0.0221
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

  render() {
    const state = this.props.navigation.state.params;
    const navigation = this.props.navigation;
    console.log(state);
    return (
      <Screen>
        <ImageBackground
          onLoad={() =>
            this.setState(state => ({ ...state, imageLoaded: true }))
          }
          styleName="large-banner"
          source={{
            uri: state.gallery[0] || 'https://picsum.photos/600/600?random&blur'
          }}
        >
          {this.state.imageLoaded && (
            <Tile>
              <View styleName="actions">
                <Button styleName="tight clear">
                  <Icon name="tweet" />
                </Button>
              </View>
              <Title>{state.title}</Title>
              <Caption>
                {new Date(state.pubDate).toLocaleDateString()} -{' '}
                {new Date(state.pubDate).toLocaleTimeString()}
              </Caption>
            </Tile>
          )}
          {!this.state.imageLoaded && (
            <View styleName="actions">
              <Caption>Loading event, please wait a second.</Caption>
              <ActivityIndicator />
            </View>
          )}
        </ImageBackground>
        <Tile>
          <Text style={{ margin: 15 }}>{state.description}</Text>
          <Button
            styleName="dark"
            onPress={() =>
              navigation.navigate('ActivityMap', {
                coordinates: this.initialCoordinates,
                markers: this.markers
              })
            }
          >
            <Text>See on map</Text>
          </Button>
        </Tile>
      </Screen>
    );
  }
}
