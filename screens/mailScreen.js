
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  View
} from 'react-native';

import { Input, Text, Button, Image, Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
// import { createAppContainer,createStackNavigator, createSwitchNavigator } from 'react-navigation';
const USER_ID = 'user_id'

export default class Mail extends Component {

  render() {
    return (
      <View style={styles.container}>
         <Image
          source={
            require('../assets/images/konekt_png.png')
          }
          style={styles.logoImg}
        />
        <Text h2 style={styles.title}>MAIL BOX</Text>
        <Text>Coming soon...</Text>

      </View>
    );
  }
}


const PURPLE = '#A011FF'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10,
    paddingTop: 180
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
    alignSelf: 'center'
  },
  title: {
    color:PURPLE,
    fontSize: 25,
  },
  logoImg: {
    width: 250,
    resizeMode: 'contain',
    marginLeft: 0,
  },
});


