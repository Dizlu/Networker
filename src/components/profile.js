// @flow
import React, { Component } from 'React';
import { Image } from 'react-native';
import { View, Title, Text, Tile, Button, Screen, Subtitle } from '@shoutem/ui';
import firebase from 'react-native-firebase';

type Props = {
  navigation: Object,
  username: string,
  avatar: string
};

export default class Profile extends Component<Props> {
  static navigationOptions = {
    title: 'My profile'
  };

  constructor(
    props = { username: 'Test user', avatar: 'Avatar will go here' }
  ) {
    super(props);
    this.props = props;
  }

  componentDidMount() {
    const httpsCallable = firebase.functions().httpsCallable('myFooBarFn');

    httpsCallable({ some: 'args' })
      .then(({ data }) => {
        console.log(data); // hello world
      })
      .catch(httpsError => {
        console.log(httpsError.code); // invalid-argument
        console.log(httpsError.message); // Your error message goes here
        console.log(httpsError.details.foo); // bar
      });
  }

  render() {
    return (
      <Screen>
        <Tile
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            margin: 10,
            padding: 15
          }}
        >
          <Image
            style={{ height: 200, width: 200, borderRadius: 100 }}
            source={{
              uri:
                'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
            }}
          />
          <Subtitle>Your name: {this.props.username}</Subtitle>
        </Tile>
      </Screen>
    );
  }
}
