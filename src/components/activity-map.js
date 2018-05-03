import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {Text, Screen, Title, Button} from '@shoutem/ui';

class ActivityMap extends Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Title>Networker</Title>,
      headerRight: (
        <Button
          styleName="textual"
          onPress={() => navigation.navigate("Profile")}
        >
          <Text>Profile</Text>
        </Button>
      )
    };
  };

  render() {
    return (
      <Screen styleName={'vertical collapsed'}>
        <Text styleName={'h-center'}>Map: </Text>
        <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 51.2465,
            longitude: 22.5684,
            latitudeDelta: 0.0422,
            longitudeDelta: 0.0221,
          }}
        />
      </Screen>
    );
  }
}

export default ActivityMap;
