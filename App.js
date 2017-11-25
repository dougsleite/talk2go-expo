import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';

import store from './store';
import CountriesScreen from './screens/CountriesScreen';
import TranslationScreen from './screens/TranslationScreen';

export default class App extends Component {
    render() {
        const MainNavigator = StackNavigator({
            countries: {
              screen: CountriesScreen,
            },
            translation: {
              screen: TranslationScreen,
            },
        });

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
