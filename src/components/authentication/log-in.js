import React, { Component } from "react";
import { View } from "react-native";
import firebase from "react-native-firebase";
import {
  Button,
  Caption,
  Title,
  Tile,
  TextInput,
  Text,
  Heading
} from "@shoutem/ui";
//import { connect } from "react-redux";

class Redirector extends Component {
  componentDidMount() {
    this.props.navigation.navigate("Home", this.props.user);
  }

  render() {
    return <View />;
  }
}

export class LogIn extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <Title>Networker</Title>
    };
  };
  unsubscriber = null;
  state = {
    email: "",
    password: "",
    user: null
  };

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState(user);
    });
  }

  loginWithEmail(state) {
    firebase
      .auth()
      .signInAndRetrieveDataWithEmailAndPassword(state.email, state.password)
      .then(res => {
        this.setState(state => ({
          ...state,
          user: res.user
        }));
      })
      .catch(err => console.log(err));
  }

  registerWithEmail(state) {
    firebase
      .auth()
      .createUserAndRetrieveDataWithEmailAndPassword(
        state.email,
        state.password
      )
      .then(res => {
        this.setState(state => ({
          ...state,
          user: res.user
        }));
      });
  }

  render() {
    const isLogged = this.state.user;
    const navigation = this.props.navigation;
    if (!isLogged) {
      return (
        <View>
          <Tile style={{ margin: 10, padding: 10 }}>
            <Title
              styleName="sm-gutter-bottom"
              style={{ flexGrow: 1, margin: 25 }}
            >
              Log in
            </Title>
            <TextInput
              placeholder={"Username or email"}
              onChangeText={text =>
                this.setState(state => ({ ...state, email: text }))
              }
              autoCorrect={false}
            />
            <TextInput
              placeholder={"Password"}
              onChangeText={text =>
                this.setState(state => ({ ...state, password: text }))
              }
              autoCorrect={false}
              secureTextEntry
            />
          </Tile>
          <Button
            styleName="secondary"
            style={{ margin: 5, marginLeft: 15 }}
            onPress={() => this.loginWithEmail(this.state)}
          >
            <Text>Log in!</Text>
          </Button>
          <Button
            style={{ margin: 5, marginLeft: 15 }}
            onPress={() => this.registerWithEmail(this.state)}
          >
            <Text>Register</Text>
          </Button>
        </View>
      );
    } else if (this.state.user) {
      return <Redirector navigation={navigation} user={this.state.user} />;
    }
  }
}
/* 
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
 */
