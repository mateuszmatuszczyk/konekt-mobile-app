
import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  View,
  ScrollView
} from 'react-native';

import {
  Input,
  Text,
  Button,
  Image,
  SearchBar,
  ListItem,
  Card
} from 'react-native-elements';

import Login from './loginScreen'


const USER_TOKEN = 'user_token'

export default class Settings extends Component {

  state = {
    search: '',
  };

  updateSearch = search => {
    this.setState({ search });
  };


  render() {
    const { search } = this.state;
    const list = [
      {
        name: 'amy@gmail.com',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        subtitle: 'amybaby'
      },
      {
        name: 'chris@hotmail.com',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'chrispyduck'
      },
      {
        name: 'gordon@gmail.com',
        avatar_url: 'https://cdn.pixabay.com/photo/2016/11/18/23/38/child-1837375_960_720.png',
        subtitle: 'gordy'
      },
      {
        name: 'focus@pocus.com',
        avatar_url: 'https://www.conveyancemarketinggroup.com/subconveyance/wp-content/uploads/2015/09/Carolyn-Dobson-avatar-VPBD.png',
        subtitle: 'focusmok'
      },
    ]
    return (
      <View style={styles.container}>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Image
            source={
              require('../assets/images/konekt_png.png')
            }
            style={styles.logoImg}
          />
          <Text h3 style={styles.title}>FRIEND SEARCH</Text>
          <SearchBar
            platform="ios"
            placeholder="Type friend's e-mail here..."
            onChangeText={this.updateSearch}
            value={search}
          />
          <TouchableHighlight onPress={() => alert("Searching...")} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>SEARCH</Text>
          </TouchableHighlight>
        
        <View style={styles.search_result_container}>
          {
            list.map((l, i) => (
              <ListItem
                key={i}
                leftAvatar={{ source: { uri: l.avatar_url } }}
                title={l.name}
                subtitle={l.subtitle}
              />
            ))
          }
        </View>
        </View>
      </View>
    );
  }
}
const PURPLE = '#A011FF'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    padding: 10
  },
  title: {
    color: PURPLE,
    fontSize: 25,
  },
  logoImg: {
    width: 250,
    resizeMode: 'contain',
    marginLeft: 0,
  },
  logoutButton: {
    height: 50,
    backgroundColor: PURPLE,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  logoutButtonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  },
  search_result_container: {
    width: 350,
  },
  connection_name: {
    fontWeight: '600',
    width: 100,
    marginTop: 5,
    marginBottom: 10
  },
  connection_social_score: {
    fontWeight: '600',
    width: 80,
    marginTop: 5,
    marginBottom: 10
  },
  connection_distance: {
    fontWeight: '600',
    width: 100,
    marginTop: 5,
    marginBottom: 10
  },
  connectionavatar: {
    marginRight: 10,
    width: 50,
    height: 50
  },
});


