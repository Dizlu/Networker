import React, { Component } from "react";
import { View, Text } from "react-native";
import firebase from "react-native-firebase";
import { Button, Caption } from "@shoutem/ui";
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
            style={{ margin: 5, padding: 15 }}
            onPress={() => this.logInAnonymously()}
          >
            Log in annonymously her!
          </Caption>
        </Button>
        <Text> Hello world, yo </Text>
      </View>
    );
  }
}
/* 
const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
 */
