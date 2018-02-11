import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { text: 'Welcome to Talk2Go', color: '#1f94d0', textColor: 'white' },
    { text: 'Set up your home country with a long press', color: 'white', textColor: '#1f94d0' },
    { text: 'Select your destination with a single press', color: '#1f94d0', textColor: 'white' }
];

class WelcomeScreen extends Component {

    onSlidesComplete = async () => {
        await AsyncStorage.setItem('welcomeScreenExecuted', JSON.stringify(true));
        this.props.navigation.navigate('countries');
    }

    render() {
        return(
            <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete}/>
        );
    }
}

export default WelcomeScreen;
