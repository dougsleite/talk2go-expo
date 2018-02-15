import React, { Component } from 'react';
import { View, Text, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements'; 
import { HEADER_STYLE, HEADER_TITLE_STYLE } from '../styles/commons';

const FLATICON_URL = 'https://www.flaticon.com/packs/countrys-flags';
const VIAJANTE_FORA_DA_CURVA = 'http://www.viajanteforadacurva.com';

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
                <Card title='Sponsors'>
                    <Text style={styles.textCardStyle}>
                        This app was supported by{"\n"} Viajante Fora da Curva
                    </Text> 
                    <Button
                        icon={{name: 'open-in-browser'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{
                            borderRadius: 0, 
                            marginLeft: 0,
                            marginRight: 0, 
                            marginBottom: 0
                        }}
                        title='Visit it!' 
                        onPress={() => Linking.openURL(VIAJANTE_FORA_DA_CURVA)}
                    />                                   
                </Card>
                <Card title='License'>
                    <Text style={styles.textCardStyle}>
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

const styles = {
    textCardStyle: {
        marginBottom: 10, 
        textAlign: 'center'
    }
};

export default InformationScreen;