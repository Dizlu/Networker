import React, {Component} from "react";
import {
  Screen,
  ListView,
  Text,
  Button,
  Title
} from "@shoutem/ui";
import XMLParse from "../../../services/XMLParse";
import ActivityCard from "../activity-card";
import MapView from "react-native-maps";

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

type xmlItem = {
  rss: {
    channel: {
      item: Object
    }
  }
}

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
    const rssLink = this.props.link || 'https://lublin.eu/rss/pl/66/2.xml';

    XMLParse(rssLink)
      .then( (parsedData: xmlItem) => {

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
        <ListView data={this.state.activities} renderRow={this.renderRow}/>
      </Screen>
    );
  }
}

export default Category;