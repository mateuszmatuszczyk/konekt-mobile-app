
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  View
} from 'react-native';

import { Input, Text, Button, Image, Divider } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';


const USER_TOKEN = 'user_token'

export default class HomeScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
        <Image
          source={
            require('../assets/images/konekt_png.png')
          }
          style={styles.logoImg}
        />
        <TouchableHighlight onPress={()=> this.props.navigation.navigate('Home')} style={styles.button}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={()=> this.props.navigation.navigate('Login')} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableHighlight>

        
      </View>
    );
  }
}

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
    fontSize: 25,
  },
  logoImg: {
    width: 250,
    resizeMode: 'contain',
    marginLeft: 0,
  },
});


