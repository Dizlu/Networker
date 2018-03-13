import React, {Component} from 'react';
import {Button, Picker, StyleSheet, Text, TextInput, View} from 'react-native';

class ActivityCard extends Component {
  state = {
    name: 'Some cool texts',
    description: 'some description placeholder',
    category: 1
  };

  /*
    Structure of single activity:
   - Name of activity
   - Description
   - Time
   - Category
   - Location (Google Maps)
   */

  render = () => {
    return (
      <View style={styles.container}>
        <View style={{marginBottom: 10}}>
          <Text style={styles.header}>Create new activity </Text>
          <View style={{marginTop: 5, marginBottom: 5}}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={(name) => this.setState(state => ({...state, name}))}
              value={this.state.text}
              autoCorrect={false}
            />
          </View>
          <View style={{marginTop: 5, marginBottom: 5}}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              onChangeText={(description) => this.setState(state => ({...state, description}))}
              value={this.state.text}
              autoCorrect={false}
            />
          </View>
          <Picker
            selectedValue={this.state.category}
            onValueChange={(itemValue, itemIndex) => this.setState( state => ({...state, category: itemValue}))}
            mode={'dropdown'}
          >
            <Picker.Item label={'Something'} value={12} />
            <Picker.Item label={'Something1'} value={13} />
            <Picker.Item label={'Something2'} value={14} />
            <Picker.Item label={'Something3'} value={15} />
            <Picker.Item label={'Something4'} value={16} />
            <Picker.Item label={'Something5'} value={17} />
          </Picker>
        </View>
        <View style={{borderWidth: 2, borderColor: 'black', padding: 20}}>
          <Text style={styles.header}> Preview of activity </Text>
          <Text style={styles.label}>Name</Text>
          <Text>{this.state.name}</Text>

          <Text style={styles.label}>Description</Text>
          <Text>{this.state.description}</Text>

          <Text style={styles.label}>Category</Text>
          <Text>{this.state.category}</Text>
        </View>
        <Button title={'Add activity'} onPress={() => this.props.addActivity(this.state)}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10
  },
  input: {
    height: 40,
    borderColor: '#eee',
    borderWidth: 1
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

export default ActivityCard;