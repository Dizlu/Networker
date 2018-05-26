import React, { Component } from "react";
import { View } from "react-native";
import firebase from "react-native-firebase";
import { Button, Caption, Title, Tile, TextInput, Text } from "@shoutem/ui";
//import { connect } from "react-redux";

export class LogIn extends Component {
  unsubscriber = null;
  state = {
    login: "",
    password: "",
    uid: null
  };

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged(user => {
      this.setState(user);
    });
  }

  logInAnonymously() {
    console.log("logging...");
    firebase
      .auth()
      .signInAnonymouslyAndRetrieveData()
      .then(credential => {
        if (credential) {
          console.log("default app user ->", credential.user.toJSON());
        }
      })
      .catch(e => {
        console.log(e);
      });
  }

  loginWithEmail(state) {
    firebase
      .auth()
      .signInWithEmailAndPassword(state.login, state.password)
      .then(res => {
        this.setState(state => ({
          ...state,
          uid: res.uid
        }));
      })
      .catch(err => console.log(err));
  }

  render() {
    const isLogged = this.state.uid;
    if (!isLogged) {
      return (
        <View>
          <Button>
            <Caption
              style={{ margin: 15, padding: 15 }}
              onPress={() => this.logInAnonymously()}
            >
              Log in annonymously here!
            </Caption>
          </Button>
          <Tile style={{ margin: 10 }}>
            <Title styleName={"h-center"} style={{ margin: 25 }}>
              Log in here
            </Title>
            <TextInput
              placeholder={"Username or email"}
              onChangeText={text =>
                this.setState(state => ({ ...state, login: text }))
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
            <Button
              styleName={"dark"}
              onPress={() => this.loginWithEmail(this.state)}
            >
              <Text>Log in!</Text>
            </Button>
          </Tile>
        </View>
      );
    } else if (this.state.uid) {
      return (
        <View>
          <Title>Hello dear user!</Title>
        </View>
      );
    }
  }
}
/* 
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
 */
