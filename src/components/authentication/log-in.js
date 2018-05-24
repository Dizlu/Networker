import React, { Component } from "react";
import { View } from "react-native";
import firebase from "react-native-firebase";
import { Button, Caption, Title, Tile, TextInput, Text } from "@shoutem/ui";
//import { connect } from "react-redux";

export class LogIn extends Component {
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

  render() {
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
            onChangeText={text => console.log(text)}
            autoCorrect={false}
          />
          <TextInput
            placeholder={"Password"}
            onChangeText={text => console.log(text)}
            autoCorrect={false}
            secureTextEntry
          />
          <Button styleName={"dark"}>
            <Text>Log in!</Text>
          </Button>
        </Tile>
      </View>
    );
  }
}
/* 
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
 */
