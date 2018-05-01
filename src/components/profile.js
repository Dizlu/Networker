// @flow
import React, {Component} from 'React';
import { View, Text, Button } from '@shoutem/ui';
type Props = {
  navigation: Object
}

export default class Profile extends Component<Props> {
  static navigationOptions = {
    title: 'My profile'
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
};
