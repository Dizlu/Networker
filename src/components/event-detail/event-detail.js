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
  InlineGallery
} from '@shoutem/ui';
import { ActivityIndicator, ScrollView } from 'react-native';
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
    const images =
      state.images &&
      state.images.map(image => ({
        source: {
          uri: image
        }
      }));
    console.log(images);
    return (
      <ScrollView>
        <Tile>
          <Title
            style={{
              marginTop: 20,
              marginBottom: 20,
              fontSize: 20,
              textAlign: 'center',
              alignSelf: 'center'
            }}
          >
            {state.name}
          </Title>
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
            <Text>See location on map</Text>
          </Button>
          {images && <Title>Gallery:</Title>}
        </Tile>
        <InlineGallery data={images ? images : []} />
      </ScrollView>
    );
  }
}
