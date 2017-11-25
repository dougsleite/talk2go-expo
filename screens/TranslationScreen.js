import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { HEARD_STYLE, HEADER_TITLE_STYLE } from '../styles/commons';
import { TabNavigator } from 'react-navigation';
import TranslationTabScreen from './TranslationTabScreen';

class TranslationScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            headerTitle: state.params.country.name,
            headerStyle: HEARD_STYLE,
            headerTitleStyle: HEADER_TITLE_STYLE
        };
    };

    /*
    * Produces the TabNavigator config object:
    * For example:
    * { 
    *     "French": Object { "screen": TranslationTabScreen },
    *     "German": Object { "screen": TranslationTabScreen },
    *     "Italian": Object { "screen": TranslationTabScreen },
    * } 
    */
    createLangTabsForCountry = () => {
        const { country: { languages } } = this.props.navigation.state.params;
        return languages.map(l => ({ [l.name]: { screen: this.toTranslationTabScreen(l.name) }}))
        .reduce(( acc, cur ) => Object.assign(acc,cur), {});
    };

    toTranslationTabScreen = (countryLang) => () => {
        const { country } = this.props.navigation.state.params;
        const { homeCountry } = this.props;
        // FIXEME: Need to be the onde defined by the user
        const homeCountryLang = homeCountry.languages[0].name;

        return (
            <TranslationTabScreen 
                toIconUri={country.icon_url}
                fromIconUri={homeCountry.icon_url}
                fromTranslationText={this.getTranslationText(homeCountry, homeCountryLang)}
                toTranslationText={this.getTranslationText(country, countryLang)}
            />
        );
    }

    getTranslationText = (c, l) => {
        return _.at(c.text.greetings, [_.lowerCase(l)])[0];
    }

    render() {
        const Tabs = TabNavigator(this.createLangTabsForCountry(), {
            animationEnabled: true,
            lazy: false,
        });
        return(
            <View style={{ flex: 1 }}>
                <Tabs />
            </View>
        );
    }
}

const mapStateToProps = ({ homeCountry }) => {
    return { homeCountry };
};

export default connect(mapStateToProps)(TranslationScreen);
