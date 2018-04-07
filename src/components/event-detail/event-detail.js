import React, {Component} from 'React';
import { Text, Title, Button, View, Tile, Caption, Icon, ImageBackground } from '@shoutem/ui';
import {ActivityIndicator} from "react-native";

type State = {
  imageLoaded: boolean
}

type Props = {
  navigation: {
    state: {
      params: {
        description: string,
        image: string
      }
    }
  }
}

export default class EventDetail extends Component<State, Props> {
  static navigationOptions = (props) => {
    const {navigation} = props;
    return {
      headerTitle: <Title>Event details</Title>,
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

  state = {
    imageLoaded: false
  };

  render() {
    const state = this.props.navigation.state.params;
    console.log(state);
    return <View>
      <ImageBackground
        onLoad={() => this.setState( state => ({...state, imageLoaded: true}))}
        styleName="large-banner"
        source={{ uri: state.image || 'https://picsum.photos/600/600?random&blur' }}
      >
        {this.state.imageLoaded && <Tile>
          <View styleName="actions">
            <Button styleName="tight clear"><Icon name="tweet" /></Button>
          </View>
          <Title>{state.title}</Title>
          <Caption>{new Date(state.pubDate).toLocaleDateString()} - {new Date(state.pubDate).toLocaleTimeString()}</Caption>
        </Tile>}
        {!this.state.imageLoaded && <View styleName="actions">
          <Caption >Loading event, please wait a second.</Caption>
          <ActivityIndicator />
        </View>}
      </ImageBackground>
      <Tile>
        <Text style={{margin: 15}}>{state.description}</Text>
      </Tile>
    </View>
  }
}
