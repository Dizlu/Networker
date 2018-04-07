// @flow
import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import uuid from "uuid";
import {
  Subtitle,
  Button,
  View,
  Screen,
  Heading,
  Text,
  TextInput,
  Switch
} from "@shoutem/ui";
import CustomPicker from "./utils/picker";
import ActivityCard from "./activity-card";
type State = {
  name: string,
  description: string,
  category: number,
  uuid: string,
  previewVisible: boolean,
  selectVisible: boolean,
};

type Props = {
  addActivity: (state: Object<>) => void
};


class ActivityForm extends Component<Props, State> {
  state = {
    name: "Some cool texts",
    description: "some description placeholder",
    category: 1,
    uuid: uuid(),
    previewVisible: false,
    selectVisible: true,
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
      name: "Some name",
      value: 1
    },
    {
      name: "Some name2",
      value: 2
    },
    {
      name: "Some nam3",
      value: 3
    },
    {
      name: "Some name4",
      value: 4
    }
  ];

  render() {
    return (
      <Screen>
        <ScrollView>
          <Subtitle style={{ marginHorizontal: 10 }} styleName={"h-center"}>
            Name
          </Subtitle>
          <TextInput
            placeholder={"Name of event"}
            onChangeText={name => this.setState(state => ({ ...state, name }))}
          />
          <Subtitle styleName={"h-center"}>Description</Subtitle>
          <TextInput
            multiline={true}
            placeholder={"Description of event"}
            onChangeText={description =>
              this.setState(state => ({ ...state, description }))
            }
            autoCorrect={false}
          />
          <View styleName="content md-gutter-top md-gutter-left">
            <Subtitle>Show categories</Subtitle>
            <Switch
              value={this.state.selectVisible}
              onValueChange={value => this.setState((state) => ({...state, selectVisible: value}))}
              />
          </View>
          {this.state.selectVisible && <CustomPicker
            options={this.pickerOptions}
            onValueChange={(itemValue, itemIndex) =>
              this.setState(state => ({
                ...state,
                category: itemValue
              }))
            }
          />}
          <View styleName="content md-gutter-top md-gutter-left">
            <Subtitle>Show preview</Subtitle>
            <Switch
              value={this.state.previewVisible}
              onValueChange={value => this.setState((state) => ({...state, previewVisible: value}))}
            />
          </View>
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
    color: "#575757",
    fontSize: 11
  },
  header: {
    textAlign: "center",
    fontSize: 25
  }
});

export default ActivityForm;
