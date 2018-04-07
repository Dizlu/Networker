import React, {Component} from "react";
import {StyleSheet} from "react-native";
import {
  Screen,
  ListView,
  Text,
  Button,
  Title
} from "@shoutem/ui";
import XMLParse from "../../../services/XMLParse";
import ActivityCard from "../activity-card";

type Props = {
  navigation: Object
};

type activity = {
  img: string,
  name: string,
  description: string,
  uuid: string
};

type State = {
  activities: Array<activity>
};

class Category extends Component<Props, State> {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: <Title>Networker</Title>,
      headerRight: (
        <Button
          styleName="textual"
          onPress={() => navigation.navigate("Profile")}
        >
          <Text>Profile</Text>
        </Button>
      )
    };
  };

  componentDidMount() {
    XMLParse('https://lublin.eu/rss/pl/66/2.xml')
      .then(parsedData => {

        this.setState(state => ({
          activities: [
            ...state.activities,
            ...parsedData.rss.channel.item
          ]
        }));
      });
  }

  state = {
    activities: []
  };

  goToDetail = event => {
    this.props.navigation.navigate("EventDetail", event);
  };

  renderRow = item => <ActivityCard {...item} goToDetail={this.goToDetail}/>;

  render() {

    return (
      <Screen>
        {!this.state.formVisible && (
          <Button
            styleName="textual"
            onPress={() => {
              this.props.navigation.navigate("EventForm", {
                addItem: item =>
                  this.setState(state => ({
                    ...state,
                    activities: [...state.activities, item]
                  }))
              });
            }}
          >
            <Text>Add new event!</Text>
          </Button>
        )}
        <ListView data={this.state.activities} renderRow={this.renderRow}/>
      </Screen>
    );
  }
}

export default Category;