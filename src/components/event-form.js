// @flow
import React, {Component} from 'React';
import ActivityForm from './activity-form';

type EventFormProps = {
  items: Object,
  navigation: Object
}

export default class EventForm extends Component<EventFormProps> {
  static navigationOptions = {
    title: 'New event'
  }

  render () {
    return (
      <ActivityForm addActivity={(item) => {
          this.props.navigation.navigate('App', {...this.props.navigation.state, item });
        }}/>
    )
  }
}
