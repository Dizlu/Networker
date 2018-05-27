// @flow
import React, { Component } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import uuid from 'uuid';
import {
  Subtitle,
  Button,
  View,
  Screen,
  Heading,
  Text,
  TextInput,
  Switch,
  Tile
} from '@shoutem/ui';
import CustomPicker from './utils/picker';
import ActivityCard from './activity-card';

type State = {
  name: string,
  description: string,
  category: {
    name: string,
    value: number
  },
  uuid: string,
  previewVisible: boolean,
  selectVisible: boolean,
  pubDate: Date
};

type Props = {
  addActivity: (state: Object<>) => void
};

class ActivityForm extends Component<Props, State> {
  state = {
    name: 'Test - World Championship 2018',
    description:
      "Test - world's most anticipated event of century will take place in Russia, featuring the best players in the world like: Ronadlinho, Puson. Come and see them live!",
    category: {
      name: 'Wydarzenie kulturalne',
      value: 1
    },
    uuid: uuid(),
    previewVisible: false,
    selectVisible: false,
    pubDate: new Date()
  };

  /*
    Structure of single activity:
   - Name of activity
   - Description
   - Time
   - Category
   - Location (Google Maps)
   */

  pickerOptions = [
    {
      name: 'Wydarzenie kulturalne',
      value: 1
    },
    {
      name: 'Turniej futbolowy',
      value: 2
    },
    {
      name: 'Przegląd talentów',
      value: 3
    },
    {
      name: 'Meetup IT',
      value: 4
    }
  ];

  render() {
    return (
      <Screen>
        <ScrollView>
          <Tile style={{ margin: 10 }}>
            <Subtitle style={{ margin: 10 }} styleName={'h-center'}>
              Name
            </Subtitle>
            <TextInput
              placeholder={'Name of event'}
              onChangeText={name =>
                this.setState(state => ({ ...state, name }))
              }
            />
            <Subtitle styleName={'h-center'} style={{ margin: 10 }}>
              Description
            </Subtitle>
            <TextInput
              multiline={true}
              numberOfLines={4}
              placeholder={'Description of event'}
              onChangeText={description =>
                this.setState(state => ({ ...state, description }))
              }
              autoCorrect={false}
            />
          </Tile>
          <View styleName="content horizontal space-between">
            <View style={{ margin: 15 }}>
              <Button
                onPress={value =>
                  this.setState(state => ({ ...state, selectVisible: true }))
                }
              >
                <Text>Choose category</Text>
              </Button>
            </View>
            <View style={{ margin: 15 }}>
              <Subtitle>Show preview</Subtitle>
              <Switch
                value={this.state.previewVisible}
                onValueChange={value =>
                  this.setState(state => ({ ...state, previewVisible: value }))
                }
              />
            </View>
          </View>
          {this.state.selectVisible && (
            <View>
              <Button
                onPress={() =>
                  this.setState(state => ({ ...state, selectVisible: false }))
                }
              >
                <Text>Done</Text>
              </Button>
              <CustomPicker
                options={this.pickerOptions}
                onValueChange={(itemValue, itemIndex) => {
                  const category = this.pickerOptions.find(
                    option => itemValue === option.value
                  );
                  this.setState(state => ({
                    ...state,
                    category
                  }));
                }}
                selectedValue={this.state.category.value}
              />
            </View>
          )}

          {this.state.previewVisible && <ActivityCard {...this.state} />}
          <Button
            style={{ margin: 10 }}
            onPress={() => {
              this.props.addActivity(this.state);
              this.setState(state => ({ ...state, uuid: uuid() }));
            }}
          >
            <Text>Add event</Text>
          </Button>
        </ScrollView>
      </Screen>
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
