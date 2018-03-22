// @flow
import React, { Component } from "React";
import ActivityForm from "./activity-form";

type EventFormProps = {
  navigation: Object,
  addItem: Function
};

type State = {
  activities: Array<{}>
};

export default class EventForm extends Component<EventFormProps, State> {
  static navigationOptions = {
    title: "New event"
  };

  render() {
    return (
      <ActivityForm
        addActivity={item => {
          this.props.navigation.state.params.addItem(item);
          this.props.navigation.goBack();
        }}
      />
    );
  }
}
