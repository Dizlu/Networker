import React, {Component} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

class ActivityMap extends Component {

  state = {
    text: 'Example'
  };

  render() {
    return (
      <View style={{flex: 1, margin: 10}}>
        <Text>Enter some text below!</Text>
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(text) => this.setState(state => {
              return {
                text: text
              };
            })}
            value={this.state.text}
            autoCorrect={false}
          />=
        <Text style={{marginTop: 30}}>{this.state.text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    width: '90%',
    margin: 10,
    height: 600,
  }
});

export default ActivityMap;