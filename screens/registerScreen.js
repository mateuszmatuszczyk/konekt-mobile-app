import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    TextInput,
    View,
    TouchableHighlight,
    ImageBackground,
    KeyboardAvoidingView
} from 'react-native';

import {
    Input,
    Text,
    Button,
    Image
} from 'react-native-elements';

import { ScrollView } from 'react-native-gesture-handler';
import Constants from 'expo-constants';
import Logo from '../components/logoComponent'
import BG_PHOTO from '../assets/images/gradient_bg.png'

/*********************************************/
/*************** IMPORTS OVER ****************/
/*********************************************/

export default class Register extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            password_confirmation: "",
            errors: [],
        }
    }

    //KONEKT:
    // https://konekt-app.herokuapp.com/api/users/login -> POST -> {email:'paulbyrnew@gmail.com',password:'xX14500057'}
    // https://konekt-app.herokuapp.com/api/users/register -> POST -> {email:'myemail@email.com',password:'password'}


    async onRegisterPressed() {
        try {
            this.setState({ errors: [] })
            let response = await fetch('https://konekt-app.herokuapp.com/api/users/register', {
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
                this.props.navigation.navigate('Login')
            } else {
                let errors = res;
                throw errors;
            }
        }
        catch (errors) {
            console.log("Catch ERROR: " + errors)
            let errorsArray = []
            errorsArray.push(errors)
            this.setState({ errors: errorsArray })
        }
    }




    render() {
        return (

            <KeyboardAvoidingView behavior="position" style={styles.container}>
                <ImageBackground source= {BG_PHOTO}  style={{alignItems: 'center', width: '100%', height: '100%' }}>
                    <Logo />
                    {/* <ScrollView> */}
                    <Text h1 style={{ textAlign: 'center', color: '#A011FF', marginBottom: 20, marginTop: 150 }}>REGISTRATION</Text>
                    <View style={styles.registrationContainer}>
                        {/* <Text>
                            Email: {this.state.email + "\n"}
                            Password: {this.state.password}
                        </Text> */}
                        <Input style={styles.input}
                            placeholder='Enter your e-mail'
                            onChangeText={(val) => this.setState({ email: val })}
                            placeholderTextColor="#ffff"
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            inputStyle={{ color: "#ffff", marginLeft: 17 }}
                            leftIcon={{ type: 'font-awesome', color: 'white', name: 'user' }}
                        />
                        <Input style={styles.input}
                            placeholder='Choose password'
                            onChangeText={(val) => this.setState({ password: val })}
                            placeholderTextColor="#ffff"
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            inputStyle={{ color: "#ffff", marginLeft: 10 }}
                            leftIcon={{ type: 'font-awesome', color: 'white', name: 'key' }}
                            secureTextEntry={true}
                        />
                        <Input style={styles.input}
                            placeholder='Confirm password'
                            onChangeText={(val) => this.setState({ password_confirmation: val })}
                            placeholderTextColor="#ffff"
                            inputContainerStyle={{ borderBottomWidth: 0 }}
                            inputStyle={{ color: "#ffff", marginLeft: 10 }}
                            leftIcon={{ type: 'font-awesome', color: 'white', name: 'key' }}
                            secureTextEntry={true}
                        />
                        <TouchableHighlight onPress={this.onRegisterPressed.bind(this)} style={styles.button}>
                            <Text style={styles.buttonText}>REGISTER</Text>
                        </TouchableHighlight>
                        <Errors errors={this.state.errors} />
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Login')} >
                            <Text style={styles.linkText}>Already registered? Login now!</Text>
                        </TouchableHighlight>
                    </View>
                    {/* </ScrollView> */}
                </ImageBackground>
            </KeyboardAvoidingView>
        );
    }
}

const Errors = (props) => {
    return (
        <View>
            {props.errors.map((error, i) => <Text key={i} style={styles.error}> {error} </Text>)}
        </View>
    );
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
        marginBottom: 15,
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