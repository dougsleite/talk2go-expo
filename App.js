import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Font } from 'expo';
import { Spinner } from './components';

import store from './store';
import CountriesScreen from './screens/CountriesScreen';
import TranslationScreen from './screens/TranslationScreen';

export default class App extends Component {

    // TODO: Consider removing this
    state = {
        fontLoaded: false,
    };

    // TODO: Consider removing this
    async componentDidMount() {
        await Font.loadAsync({
            'Material Icons': require('./assets/fonts/MaterialIcons.ttf'),
        });
        this.setState({ fontLoaded: true });
    }

    render() {
        const MainNavigator = StackNavigator({
            countries: {
              screen: CountriesScreen,
            },
            translation: {
              screen: TranslationScreen,
            },
        });

        // TODO: Consider removing this
        if(!this.state.fontLoaded) {
            return <Spinner size="large" />;
        }
        return (
            <Provider store={store}>
                <MainNavigator />
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
