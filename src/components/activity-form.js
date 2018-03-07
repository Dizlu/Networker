import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput} from "react-native-paper";

class ActivityCard extends Component {
  state = {
    text: 'Some cool text'
  };

  render () {
    return <View style={styles.main}>
      <TextInput
        label='Email'
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
      />
    </View>;
  }
}

const styles = StyleSheet.create({
  main: {
    width: '90%',
    margin: 10
  }
});

export default ActivityCard;