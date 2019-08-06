import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Button } from 'react-native-elements';

export default class SignInScreen extends React.Component {
  static navigationOptions = {
    title: 'Please sign in',
  };
  render() {
    return (
      <View>
        <Input
          placeholder='E-mail'
          leftIcon={{ type: 'font-awesome', name: 'at' }}
        />
        <Input
          placeholder='Password'
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          secureTextEntry={true}
        />
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>



    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('Main');
  };
}

