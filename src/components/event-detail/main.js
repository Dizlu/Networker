import React, {Component} from 'React';
import { Text } from '@shoutem/ui';

export default class EventDetail extends Component {

  render() {
    const navState = this.props.navigation.state.params;
    return <Text> {navState.name} </Text>;
  }
}
