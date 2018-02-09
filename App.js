import React, { Component } from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import { Spinner } from './components';

import store from './store';
import CountriesScreen from './screens/CountriesScreen';
import TranslationScreen from './screens/TranslationScreen';
import WelcomeScreen from './screens/WelcomeScreen';

export default class App extends Component {

    state = {
        fontLoaded: false,
        welcomeScreenExecuted: false
    };

    async componentWillMount() {
        let welcomeScreenExecuted = await AsyncStorage.getItem('welcomeScreenExecuted');
        this.setState({ welcomeScreenExecuted: welcomeScreenExecuted == null ? false : JSON.parse(welcomeScreenExecuted) });
    }

    // TODO: Consider removing this
    async componentDidMount() {
        await Font.loadAsync({
            'Material Icons': require('./assets/fonts/MaterialIcons.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        const CountryFlow = StackNavigator({
            countries: { screen: CountriesScreen },
            translation: { screen: TranslationScreen }
        });

        const MainNavigator = StackNavigator({
            welcome: { screen: WelcomeScreen },
            main: { screen: CountryFlow }
        }, mainNavigatorProps);

        if(!this.state.fontLoaded) {
            return <Spinner size="large" />;
        }

        if(this.state.welcomeScreenExecuted) {
            return (
                <Provider store={store}>
                    <CountryFlow />
                </Provider>
            )
        }
        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}

const mainNavigatorProps = {
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
