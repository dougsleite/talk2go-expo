import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text} from 'react-native';
import { List, ListItem, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { HEADER_STYLE, HEADER_TITLE_STYLE } from '../styles/commons';
import { TabNavigator } from 'react-navigation';
import expo from 'expo';
import TranslationTabScreen from './TranslationTabScreen';
import iconFlags from '../assets/icons/flags';
import text from '../assets/data/text';

class TranslationScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            headerTitle: state.params.country.name,
            headerStyle: HEADER_STYLE,
            headerTitleStyle: HEADER_TITLE_STYLE,
            headerBackTitleStyle: HEADER_TITLE_STYLE,
            headerBackTitle: null
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
        const { homeCountry, selectedIndex } = this.props;
        const { countryLangIdx } = this.props.navigation.state.params;
        const homeCountryLang = (_.sortBy(homeCountry.languages, 'name'))[countryLangIdx].name;
        
        // FIXME: Need to come from drawer key
        const textKey = 'greetings';

        const homeCountryImgUri = Expo.Asset.fromModule(_.get(iconFlags, homeCountry.name)).uri;
        const countryImgUri = Expo.Asset.fromModule(_.get(iconFlags, country.name)).uri;

        return (
            <TranslationTabScreen 
                fromCountryName={homeCountry.name}
                fromCountryLang={homeCountryLang}
                fromIconUri={homeCountryImgUri}
                fromTranslationText={this.getTranslationText(homeCountryLang, textKey)}

                toCountryName={country.name}
                toCountryLang={countryLang}
                toIconUri={countryImgUri}
                toTranslationText={this.getTranslationText(countryLang, textKey)}

                textKey={textKey}
            />
        );
    }

    getTranslationText = (lang, key) => {
        return _.get(text, lang)[key];
    }

    render() {
        const Tabs = TabNavigator(this.createLangTabsForCountry(), {
            animationEnabled: true,
            tabBarPosition: 'bottom',
            lazy: true,
            tabBarOptions: {
                activeTintColor: "#03A9F4",
                labelStyle: {
                  fontSize: 15,
                  fontWeight: "bold",
                  marginBottom: 15
                },
            }
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
