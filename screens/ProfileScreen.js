import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  AsyncStorage,
  View
} from 'react-native';

import {
  Icon,
  Input,
  Text,
  Button,
  Image,
  Divider,
  Avatar,
  ListItem,
  Badge,
  Card
} from 'react-native-elements';

import Logo from '../components/logoComponent'
import Constants from 'expo-constants';
import { ScrollView } from 'react-native-gesture-handler';

const USER_TOKEN = 'user_token'
const PURPLE = '#A011FF'
const USER_CONNECTIONS =
  [
    {
      "connection_id": 1,
      "friend_id": 2,
      "username": "adam",
      "distance": 6320.16,
      "social_score": 24627,
      "validated": 1,
      "accepted": 0,
      "visibility_radius": 1000
    },
    {
      "connection_id": 6,
      "friend_id": 5,
      "username": "",
      "distance": 3920.37,
      "social_score": 0,
      "validated": 0,
      "accepted": 0,
      "visibility_radius": 1000
    },
    {
      "connection_id": 14,
      "friend_id": 11,
      "username": null,
      "distance": 0.000157253,
      "social_score": 0,
      "validated": 0,
      "accepted": 0,
      "visibility_radius": 1000
    }
  ]
const SERVER_RESPONSE = console.log("*********SERVER RESPONSE**********")

export default class Profile extends Component {

  constructor() {
    super();

    this.state = {
      userid: "",
      username: "",
      age: "",
      social_score: "",
      email: "",
      error: "",
      status_msg: "",
      connections_count: null,
      connections: []
    }
  }


  async getUserConnections() {
    try {
      let response = await fetch('https://konekt-app.herokuapp.com/api/users/' + this.state.userid + '/connections')
      let res = await response.text();
      if (response.status === 200 && response != null) {
        console.log("Server response SUCCESS")
        let userconnections = JSON.parse(res)
        this.setState({
          connections: userconnections
        });
        let connections_count = Object.keys(userconnections).length;
        this.setState({ connections_count: connections_count })
        console.log("CONNECTIONS COUNT:" + connections_count)
        console.log(this.state.connections[0].distance)
      } else {
        console.log('Issue fetching data...')
      }
    }
    catch (error) {
      console.log(error)
    }
  }

  async onProfileLoad(user_id) {
    console.log("Loading up profile data...")
    try {
      let userid = user_id
      console.log("USER ID IS :" + userid)
      this.setState({ userid: userid })
      let response = await fetch('https://konekt-app.herokuapp.com/api/users/' + userid)

      let res = await response.text();
      console.log("Server response: " + res)

      if (response.status >= 200 && response.status < 300) {
        console.log("SUCCESS: " + res)
        let user_data = JSON.parse(res)
        console.log(user_data[0].email)
        this.setState({ email: user_data[0].email })
        this.setState({ age: user_data[0].age })
        this.setState({ username: user_data[0].username })
        this.setState({ social_score: user_data[0].social_score })
        this.setState({ status_msg: user_data[0].status_msg })
      } else {
        let error = res;
        throw error;
      }
    }
    catch (error) {
      console.log("Catch ERROR: " + error)
      this.setState({ error: error })
    }
  }

  async removeUserToken() {
    try {
      await AsyncStorage.removeItem(USER_TOKEN)
      this.getUserToken()
    }
    catch (error) {
      console.log("Error removing data from AsyncStorage. " + error)
    }
  }
  async getUserToken() {
    try {
      console.log("PROFILE: Looking for user token...")
      let userToken = await AsyncStorage.getItem(USER_TOKEN)
      if (!userToken) {
        console.log("No user token found!")
      } else {
        console.log("PROFILE: User token found: " + userToken)
        this.onProfileLoad(userToken)
        this.getUserConnections()
      }
    }
    catch (error) {
      console.log("Error retrieving data from AsyncStorage" + error)
    }
  }

  componentDidMount() {
    console.log("mounting component")
    this.getUserToken();
    console.log("mounted component")
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <Logo />

          <View style={styles.userProfileContainer}>
            <Text style={{ color: '#A011FF' }} h2>PROFILE</Text>
            <Avatar
              rounded
              size="xlarge"
              source={require('../assets/images/avatars/girl.png')}
            />
            <Badge width={300} badgeStyle={{ marginTop: 10, backgroundColor: "#DCA8FF", height: 30 }} height={50} value={<Text style={styles.badgeText}>{this.state.username}</Text>}></Badge>
            <View style={styles.badgeWrapper}>
              <Badge width={150} badgeStyle={{ backgroundColor: "#C26BFD", height: 30 }} height={50} value={<Text style={styles.badgeText}>{this.state.email}</Text>}></Badge>
              <Badge width={150} badgeStyle={{ backgroundColor: "#B13EFF", height: 30 }} height={50} value={<Text style={styles.badgeText}>Age: {this.state.age}</Text>}></Badge>
            </View>
            <View style={styles.badgeWrapper}>
              <Badge width={150} badgeStyle={{ backgroundColor: "#C26BFD", height: 30 }} height={50} value={<Text style={styles.badgeText}>Connections: {this.state.connections_count}</Text>}></Badge>
              <Badge width={150} badgeStyle={{ backgroundColor: "#B13EFF", height: 30 }} height={50} value={<Text style={styles.badgeText}>Social Score: {this.state.social_score}</Text>}></Badge>
              
            </View>
            <Badge width={300} badgeStyle={{ backgroundColor: "#8300DC", height: 60 }} height={50} value={<Text style={styles.badgeText}>Status Message: {"\n"+this.state.status_msg}</Text>}></Badge>

          </View>
          <Card title="Friend Connections">
            <View style={{ marginLeft: 60, flexDirection: 'row' }}>
              <Text style={styles.connection_name_title}>Username</Text>
              <Text style={styles.connection_social_score_title}>Social{"\n"}Score</Text>
              <Text style={styles.connection_distance_title}>Distance</Text>
            </View>
            {
              this.state.connections.map((connection, i) => {
                return (
                  <View key={i} style={styles.connectionsItem}>
                    <Image
                      style={styles.connectionavatar}
                      resizeMode="cover"
                      source={require('../assets/images/avatars/jimmy.png')}
                    />
                    <Text style={styles.connection_name}>{connection.username}</Text>
                    <Text style={styles.connection_social_score}>{connection.social_score}</Text>
                    <Text style={styles.connection_distance}>{Math.round(connection.distance)*1000} m</Text>
                  </View>
                );
              })
            }
          </Card>
          <TouchableHighlight onPress={() => { this.props.navigation.navigate('Welcome'); this.removeUserToken() }} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>LOGOUT</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>

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
    paddingTop: -20,
    paddingTop: Constants.statusBarHeight,
    borderTopWidth: 20,
    borderLeftWidth: 10,
    borderRightWidth: 10,
    borderColor: PURPLE,
  },
  button: {
    height: 50,
    backgroundColor: PURPLE,
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
  logoImg: {
    width: 250,
    resizeMode: 'contain',
    marginLeft: 0,
  },
  userProfileContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  badgeText: {
    alignContent:'center',
    alignSelf:'center',
    color: '#ffff'
  },
  badgeWrapper: {
    width: 300,
    flexDirection: 'row'
  },
  connectionsItem: {
    flexDirection: 'row',
    height: 60,
    width:300
  },
  connection_name_title: {
    fontWeight: '600',
    width: 100
  },
  connection_social_score_title: {
    fontWeight: '600',
    width: 80
  },
  connection_distance_title: {
    fontWeight: '600',
    width: 80
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
  logoutButton: {
    height: 50,
    backgroundColor: '#D63E3E',
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    justifyContent: 'center'
  },
  logoutButtonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  }
});


