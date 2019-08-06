import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput,
    View,
    AsyncStorage,
    TouchableHighlight,
    ImageBackground,
    KeyboardAvoidingView
} from 'react-native';

import {
    Input,
    Text,
} from 'react-native-elements';

import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import Logo from '../components/logoComponent'
import BG_PHOTO from '../assets/images/gradient_bg.png'


/*********************************************/
/*************** IMPORTS OVER ****************/
/*********************************************/

const USER_TOKEN = 'user_token'



export default class Login extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            error: "",
        }
    }

    async storeUserToken(userToken) {
        try {
            await AsyncStorage.setItem(USER_TOKEN, userToken)
            this.getUserToken();
        }
        catch (error) {
            console.log("Error storing data from AsyncStorage. " + error)
        }
    }

    async getUserToken() {
        try {
            let async_user_token = await AsyncStorage.getItem(USER_TOKEN)
            console.log("User TOKEN stored in AsyncStorage is: " + async_user_token)
        }
        catch (error) {
            console.log("Error retrieving data from AsyncStorage. " + error)
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

    //KONEKT:
    // https://konekt-app.herokuapp.com/api/users/login -> POST -> {email:'paulbyrnew@gmail.com',password:'xX14500057'}
    // https://konekt-app.herokuapp.com/api/users/register -> POST -> {email:'myemail@email.com',password:'password'}

    async onLoginPressed() {
        alert("Logging In!")
        try {
            this.setState({ error: "" })
            let response = await fetch('https://konekt-app.herokuapp.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password,
                })
            });
            let res = await response.text();
            console.log("Server response: " + res)

            if (response.status >= 200 && response.status < 300) {
                console.log("SUCCESS: " + res)
                let user_id = res
                this.storeUserToken(user_id)
                this.props.navigation.navigate('Profile')
            } else {
                let error = res;
                throw error;
            }
        }
        catch (error) {
            this.removeUserToken()
            console.log("****SERVER ERROR****: \n" + error + "\n ************")
            this.setState({ error: error })
        }
    }




    render() {
        return (
            <KeyboardAvoidingView behavior="position" style={styles.container}>
                <ImageBackground source={BG_PHOTO} style={{alignItems: 'center', width: '100%', height: '100%' }}>

                        <Logo />

                            <Text h1 style={{ textAlign: 'center', color: '#A011FF', marginBottom: 20, marginTop: 150 }}>LOGIN</Text>
                            <View style={styles.registrationContainer}>
                                {/* <Text>
                            Email: {this.state.email + "\n"}
                            Password: {this.state.password}
                        </Text> */}
                                <Input style={styles.input}
                                    onChangeText={(val) => this.setState({ email: val })}
                                    placeholderTextColor="#ffff"
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    inputStyle={{ color: "#ffff", marginLeft: 17 }}
                                    placeholder='Your e-mail'
                                    leftIcon={{ type: 'font-awesome', color: 'white', name: 'user' }
                                }
                                />

                                <Input ref={ref => this.passwordRef = ref} style={styles.input}
                                    placeholder='Your password'
                                    onChangeText={(val) => this.setState({ password: val })}
                                    placeholderTextColor="#ffff"
                                    inputContainerStyle={{ borderBottomWidth: 0 }}
                                    inputStyle={{ color: "#ffff", marginLeft: 10 }}
                                    leftIcon={{ type: 'font-awesome', color: 'white', name: 'key' }}
                                    secureTextEntry={true}
                                />
                                <TouchableHighlight onPress={this.onLoginPressed.bind(this)} style={styles.button}>
                                    <Text style={styles.buttonText}>LOGIN</Text>
                                </TouchableHighlight>
                                <Text style={styles.error}>
                                    {this.state.error}
                                </Text>
                                <TouchableHighlight onPress={() => this.props.navigation.navigate('Register')} >
                                    <Text style={styles.linkText}>Don't have an account? Register now!</Text>
                                </TouchableHighlight>

                        {/* </ScrollView> */}
                    </View>
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        marginLeft:-5,
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        //    
        // borderTopWidth: 20,
        // borderColor: "#A011FF",
        // padding: 10,
        // paddingTop: 20|
    },
    registrationContainer: {
        width: 350,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 5,
        margin:10
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18
    },
    button: {
        height: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignSelf: 'stretch',
        alignItems: 'center',
        marginTop: 10,
        justifyContent: 'center'
    },
    linkText: {
        fontSize: 15,
        alignSelf: 'center',
        color: '#FFF',
        paddingBottom: 10
    },
    buttonText: {
        fontSize: 22,
        color: '#FFF',
        alignSelf: 'center'
    },
    heading: {
        fontSize: 30,
    },
    error: {
        alignSelf: 'center',
        color: 'red',
        paddingTop: 10
    },
    loader: {
        marginTop: 20
    }
});