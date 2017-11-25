import React, { Component } from 'react';
import { ListView, View, Text} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { HEARD_STYLE, HEADER_TITLE_STYLE } from '../styles/commons';
import { TabNavigator } from 'react-navigation';

class CountryDetailScreen extends Component {

    static navigationOptions = ({ navigation }) => {
        const { state } = navigation;
        return {
            headerTitle: state.params.country.name,
            headerStyle: HEARD_STYLE,
            headerTitleStyle: HEADER_TITLE_STYLE
        };
    };

    render() {
        const { country } = this.props.navigation.state.params;
        const { homeCountry } = this.props;

        const MyTabNavigator = TabNavigator({
            text1: { screen: WelcomeScreen },
        });

        return(
            <View style={{ flex: 1 }}>
                <Text>From:</Text>
                <Text>{homeCountry.name}</Text>
                <Text>To:</Text>
                <Text>{country.name}</Text>
            </View>
        );
    }
}

const mapStateToProps = ({ homeCountry }) => {
    console.log(homeCountry);
    return { homeCountry };
};

export default connect(mapStateToProps)(CountryDetailScreen);
