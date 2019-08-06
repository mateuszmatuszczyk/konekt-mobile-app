import React, { Component } from 'react';

import { Image } from 'react-native-elements';
import { View } from 'react-native';



export default class LogoComponent extends Component {
    render() {
        return (
            <View>

                <Image
                    source={require('../assets/images/new_konekt_png.png')}
                    style={{
                        width: 250,
                        resizeMode: 'contain'
                    }}
                />
            </View>
        )
    }
}
