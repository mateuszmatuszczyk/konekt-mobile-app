import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TextInput,
    View,
} from 'react-native';

import { Input, Button, Image } from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';

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

    // MEDIPASS:
    // https://medipass-server.herokuapp.com/api/login -> POST -> {email:'paulbyrnew@gmail.com',password:'xX14500057'}
    // https://medipass-server.herokuapp.com/api/register
    async onRegisterPressed() {
        try {
            let response = await fetch('https://medipass-server.herokuapp.com/api/register', {
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
            } else {
                let errors = res;
                throw errors;
            }
        }
        catch (errors) {
            console.log("Catch ERROR: " + errors)

            let formErrors = JSON.parse(errors)
            let errorsArray = []
            for(let key in formErrors){
                if(formErrors[key].length>1){
                    formErrors[key].map(error => errorsArray.push(`${key} ${error}`))
                }else{
                    errorsArray.push(`${key} ${formErrors[key]}`)
                    
                }
            }
            this.setState({errors:errorsArray})
        }
    }




    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <LinearGradient
                    colors={['#ffff', '#ffff', '#74228D']}
                    style={styles.linearGradContainer}>
                    <Text>
                        Email: {this.state.email + "\n"}
                        Password: {this.state.password}
                    </Text>
                    <Input style={styles.input}
                        onChangeText={(val) => this.setState({ email: val })}
                        placeholder='E-mail'
                        leftIcon={{ type: 'font-awesome', name: 'at' }}
                    />
                    <Input style={styles.input}
                        onChangeText={(val) => this.setState({ password: val })}
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        secureTextEntry={true}
                    />
                    <Input style={styles.input}
                        onChangeText={(val) => this.setState({ password_confirmation: val })}
                        placeholder='Password'
                        leftIcon={{ type: 'font-awesome', name: 'user' }}
                        secureTextEntry={true}
                    />
                    <Button
                        onPress={this.onRegisterPressed.bind(this)}
                        title="Sign in!" />

                    <Errors errors={this.state.errors}/>

                    <Image
                        source={require('./assets/images/konekt_logo.png')}
                        style={{ marginTop: 200, width: 200, height: 200 }}
                    />

                </LinearGradient>
            </View>
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

// const Errors = (props) => {
//     return(
//         <View>
            
//             <Text>Errors:</Text>
                
//             {props.errors.map((error,i)=> <Text key={i} style={styles.error}>{error}</Text>
//             )}
//         </View>
//     )
// }


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
        padding: 10,
        paddingTop: 80
    },
    linearGradContainer:
    {
        alignSelf: "stretch",
        flex: 1,
        padding: 15,
        alignItems: 'center'
    },
    input: {
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderColor: '#48bbec'
    },
    button: {
        height: 50,
        backgroundColor: '#48BBEC',
        alignSelf: 'stretch',
        marginTop: 10,
        justifyContent: 'center'
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
        color: 'red',
        paddingTop: 10
    },
    loader: {
        marginTop: 20
    }
});