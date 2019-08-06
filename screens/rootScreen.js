
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  View,
  ImageBackground
} from 'react-native';

import {
  Input,
  Text,
  Button,
  Image,
  Divider
} from 'react-native-elements';

import { Font } from 'expo';
import Logo from '../components/logoComponent'


/*********************************************/
/*************** IMPORTS OVER ****************/
/*********************************************/

const USER_TOKEN = 'user_token'

export default class Root extends Component {

  componentDidMount() {
    this.getUserToken();
  }

  async getUserToken() {
    try {
      console.log("ROOT: Looking for user token...")
      let userToken = await AsyncStorage.getItem(USER_TOKEN)
      if (!userToken) {
        console.log("No user token found!")
      } else {
        this.props.navigation.navigate('Profile')
      }
    }
    catch (error) {
      console.log("Error retrieving data from AsyncStorage" + error)
    }
  }


  render() {
    return (
      <ImageBackground  source={require('../assets/images/root_bg.png')} style={{ width: '100%', height: '100%' }}>
        <View style={styles.container}>
          <Text style={styles.title}>WELCOME{"\n"}TO</Text>
          <Logo />
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Register')} style={styles.button}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: '#F5FCFF',
    borderWidth: 0,
    borderTopWidth:20,
    borderColor: "#A011FF",
    padding: 10,
    paddingTop: 280
  },
  button: {
    height: 50,
    backgroundColor: '#A011FF',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center',

  },
  title: {
    color: '#A011FF',
    fontSize: 35,
    // fontFamily: 'Zapfino',
    textAlign: "center"
  },
  logoImg: {
    width: 250,
    resizeMode: 'contain',
    marginLeft: 0
  },
});


