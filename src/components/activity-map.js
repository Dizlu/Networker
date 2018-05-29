import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Text, Screen, Title, Button } from '@shoutem/ui';

class ActivityMap extends Component {
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

  render() {
    const state = this.props.navigation.state.params;
    return (
      <Screen styleName={'vertical collapsed'}>
        <MapView style={{ flex: 1 }} initialRegion={state.coordinates}>
          {state.markers.map(marker => (
            <Marker
              key={marker.title + '-marker-key'}
              draggable
              onDragEnd={event => {
                state.setCoordinates(event.nativeEvent.coordinate);
              }}
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description}
            />
          ))}
        </MapView>
      </Screen>
    );
  }
}

export default ActivityMap;
