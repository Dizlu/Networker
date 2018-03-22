/**
 * @flow
 */

import React, { Component } from "react";
import {
  FlatList,
  View,
  ScrollView,
  Dimensions,
  StyleSheet
} from "react-native";
import { Examples, Icon, Text, Button, Title } from "@shoutem/ui";
import { StyleProvider } from "@shoutem/theme";
import { StackNavigator } from "react-navigation";
import ActivityCard from "./src/components/activity-card";
import Profile from "./src/components/profile";
import EventForm from "./src/components/event-form";

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

class App extends Component<Props, State> {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Title>Networker</Title>,
      headerRight: (
        <Button styleName="textual"
          onPress={() => navigation.navigate("Profile")}
        ><Text>Profile</Text></Button>
      )
    };
  };

  state = {
    activities: [
      {
        img:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb8hLheVssxMAPVJFe62-fxm2DTZCrbZdOJ8C5TMD48AwlTVnd",
        name: "Star wars dude",
        description:
          "This is some scary shit star wars dude, don't know him though...",
        uuid: "123superhardkey"
      }
    ]
  };

  render() {
    return (
      <View style={styles.container}>
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
        <FlatList
          data={this.state.activities}
          keyExtractor={(item, index) => item.uuid}
          renderItem={({ item }) => <ActivityCard {...item} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1
  }
});

export default StackNavigator(
  {
    Home: {
      screen: App
    },
    Profile: {
      screen: Profile
    },
    EventForm: {
      screen: EventForm
    }
  },
  {
    initialRouteName: "Home"
  }
);
