import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createBottomTabNavigator
} from 'react-navigation';


import RegisterScreen from './screens/registerScreen'
import LoginScreen from './screens/loginScreen'
import RootScreen from './screens/rootScreen'
import ProfileScreen from './screens/profileScreen';
import SearchScreen from './screens/searchScreen';
import MapScreen from './screens/mapScreen';
import MailScreen from './screens/mailScreen';


/*********************************************/
/*************** IMPORTS OVER ****************/
/*********************************************/
export default class App extends Component {
  render() {
    return <AppContainer />
  }
}

const HomeScreenTabNavigator = createBottomTabNavigator({
  Profile: ProfileScreen,
  Map: MapScreen,
  Mail: MailScreen,
  Search: SearchScreen,
},

  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        if (routeName === 'Profile') {
          return (
            <Image
              source={require('./assets/images/avatars/account.png')}
              style={{ marginBottom:10, width: 30, height: 30, }} />
          );
        }
        if (routeName === 'Map') {
          return (
            <Image
              source={require('./assets/images/avatars/internet.png')}
              style={{ marginBottom:10, width: 30, height: 30, }} />
          );
        }
        if (routeName === 'Mail') {
          return (
            <Image
              source={require('./assets/images/avatars/envelope.png')}
              style={{ marginBottom:10, width: 30, height: 30, }} />
          );
        } if (routeName === 'Search') {
          return (
            <Image
              source={require('./assets/images/avatars/worker.png')}
              style={{ marginBottom:10, width: 30, height: 30, }} />
          );
        }
      },
    }),
    tabBarOptions: {
      activeTintColor: '#ffff',
      labelStyle: {
        fontSize: 15,
      },
      style: {
        height:60,
        paddingTop: 10,
        backgroundColor: '#A011FF',
      },
    }
  })

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: RootScreen },
  Home: { screen: HomeScreenTabNavigator },
  Register: { screen: RegisterScreen },
  Login: { screen: LoginScreen }
})

const AppContainer = createAppContainer(AppSwitchNavigator)

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: '#A011FF',
  }
})

AppRegistry.registerComponent('authentication', () => App);

