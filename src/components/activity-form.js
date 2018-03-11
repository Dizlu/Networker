import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

class ActivityCard extends Component {
  state = {
    text: 'Some cool text'
  };

  render () {
    return <View style={styles.main}>
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