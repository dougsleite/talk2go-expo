import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements'; 
import { HEADER_STYLE, HEADER_TITLE_STYLE } from '../styles/commons';

const FLATICON_URL = 'https://www.flaticon.com/packs/countrys-flags';

class InformationScreen extends Component { 

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            headerTitle: 'Information',
            headerStyle: HEADER_STYLE,
            headerTitleStyle: HEADER_TITLE_STYLE,
            headerBackTitleStyle: HEADER_TITLE_STYLE,
            headerBackTitle: null
        };
    };

    render() {
        return (
            <View>
                <Card title='License'>
                    <Text style={{marginBottom: 10}}>
                        The flag icons used by this app were designed by Freepik from Flaticon
                    </Text> 
                    <Button
                        icon={{name: 'code'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{
                            borderRadius: 0, 
                            marginLeft: 0,
                            marginRight: 0, 
                            marginBottom: 0
                        }}
                        title='See more details' 
                        onPress={() => Linking.openURL(FLATICON_URL)}
                    />                                   
                </Card>
            </View>
        );
    }
}

export default InformationScreen;