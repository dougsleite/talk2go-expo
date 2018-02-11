import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
    { 
        text: [
            'Welcome',
            '歡迎',
            'Bienvenido',
            'Bienvenue',
            'желанный',
            'أهلا بك'
        ].join('\n'),
        color: '#1f94d0', 
        textColor: 'white' ,
        lineHeight: 50,
        fontSize: 30
    },
    { 
        text: [
            'Set up your home country with a long press\n',
            '長時間按下你的國家\n',
            'Configure su país de origen con una larga presión\n',
            'Configurez votre pays d\'origine avec une presse longue\n',
            'Настройте свою страну с длинным нажатием\n',
            'إعداد بلدك مع الضغط لفترة طويلة\n'
        ].join('\n'), 
        color: 'white', 
        textColor: '#1f94d0',
        lineHeight: 28,
        fontSize: 22
     },
    { 
        text: [
            'Select your destination with a single press\n',
            '只需一次按下即可選擇您的目的地\n',
            'Seleccione su destino con una sola pulsación\n',
            'Sélectionnez votre destination avec une seule presse\n',
            'Выберите пункт назначения одним нажатием\n',
            'حدد وجهتك بضغطة واحدة\n'            
        ].join('\n'), 
        color: '#1f94d0', 
        textColor: 'white',
        lineHeight: 28,
        fontSize: 22
    }
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
