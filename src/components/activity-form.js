import React, {Component} from 'react';
import {Button, Picker, StyleSheet, Text, TextInput, View} from 'react-native';
import uuid from 'uuid';

class ActivityForm extends Component {
  state = {
    name: 'Some cool texts',
    description: 'some description placeholder',
    category: 1,
    uuid: uuid(),
    pickerVisible: false
  };

  /*
    Structure of single activity:
   - Name of activity
   - Description
   - Time
   - Category
   - Location (Google Maps)
   */

  render() {
    return (
      <View style={styles.container}>
        <View>
          {!this.state.pickerVisible && <View>
            <Text style={styles.header}>Create new activity </Text>
            <View style={{margin: 5}}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={(name) => this.setState(state => ({...state, name}))}
                value={this.state.text}
                autoCorrect={false}
              />
            </View>
            <View style={{margin: 5}}>
              <Text style={styles.label}>Description</Text>
              <TextInput
                style={styles.input}
                multiline={true}
                onChangeText={(description) => this.setState(state => ({...state, description}))}
                value={this.state.text}
                autoCorrect={false}
              />
            </View>
          </View>}
          <View>
            { !this.state.pickerVisible && <Button
              title={'Choose category'}
              onPress={() => this.setState(state => ({...state, pickerVisible: true}))}
            /> }
            {this.state.pickerVisible && <Picker
              style={{borderColor: 'black', borderWidth: 1, backgroundColor: 'red'}}
              selectedValue={this.state.category}
              onValueChange={(itemValue, itemIndex) => this.setState(
                state => ({...state, category: itemValue, pickerVisible: false})
              )}
            >
              <Picker.Item label={'Sports'} value={12} />
              <Picker.Item label={'Music'} value={13} />
              <Picker.Item label={'Bowling'} value={14} />
              <Picker.Item label={'Professional alcoholism'} value={15} />
              <Picker.Item label={'Biking'} value={16} />
              <Picker.Item label={'Night racing'} value={17} />
            </Picker>}
          <View style={{borderWidth: 2, borderColor: 'black', padding: 20}}>
            <Text style={styles.header}> Preview of activity </Text>
            <Text style={styles.label}>Name</Text>
            <Text>{this.state.name}</Text>

            <Text style={styles.label}>Description</Text>
            <Text>{this.state.description}</Text>

            <Text style={styles.label}>Category</Text>
            <Text>{this.state.category}</Text>
          </View>
        </View>
        <Button style={{marginTop: 5}} title={'Add activity'} onPress={() => { this.props.addActivity(this.state); this.setState(state => ({...state, uuid: uuid()})) }}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 5,
    height: 600
  },
  input: {
    margin: 5
  },
  label: {
    color: '#575757',
    fontSize: 11
  },
  header: {
    textAlign: 'center',
    fontSize: 25
  }
});

export default ActivityForm;