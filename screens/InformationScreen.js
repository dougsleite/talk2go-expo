import React, { Component } from 'react';
import { ScrollView, Text, Linking } from 'react-native';
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
            <ScrollView style={{ flex: 1 }}>
                <Card title='Sponsors'>
                    <Text style={styles.textCardStyle}>
                        This app was supported by the awesome travel blog Viajante Fora da Curva
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
                <Card title='Contact'>
                    <Text style={styles.textCardStyle}>
                        If you have any comments or feedback please let us know! 
                        Talk2Go team would be glad to hear from you!
                    </Text> 
                    <Button
                        icon={{name: 'email'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{
                            borderRadius: 0, 
                            marginLeft: 0,
                            marginRight: 0, 
                            marginBottom: 0
                        }}
                        title='Contact us' 
                        onPress={() => Linking.openURL(`mailto:talk2go.feedback@gmail.com
                        ?subject=[Talk2Go Feedback]
                        &body=Tell us more about your thoughts! :)`)}
                    />                                   
                </Card>       
                <Card containerStyle={{ marginBottom: 15 }}>
                    <Text style={styles.textCardStyle}>
                        © 2018 Talk2Go. All rights reserved.
                    </Text> 
                </Card>                                                          
            </ScrollView>
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