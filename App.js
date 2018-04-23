import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Spinner } from './components';

import store from './store';
import CountriesScreen from './screens/CountriesScreen';
import TranslationScreen from './screens/TranslationScreen';
import InformationScreen from './screens/InformationScreen';

export default class App extends Component {

    render() {
        const MainNav = StackNavigator({
            countries: { screen: CountriesScreen },
            translation: { screen: TranslationScreen },
            information: { screen: InformationScreen }
        });

        return (
            <Provider store={store}>
                <MainNav />
            </Provider>
        )
    }
}

const mainNavigatorProps = {
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false
    }
};