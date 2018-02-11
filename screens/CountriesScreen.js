import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text} from 'react-native';
import { List, ListItem, SearchBar } from 'react-native-elements';
import { connect } from 'react-redux';
import expo from 'expo';
import { HEADER_STYLE, HEADER_TITLE_STYLE } from '../styles/commons';
import { Spinner } from '../components';
import * as actions from '../actions';
import { changeHomeCountry } from '../actions';
import iconFlags from '../assets/icons/flags';

const DEFAULT_COUNTRY_UUID = '5870d25e-452e-4ba2-9d04-a8f37eca257f';

class CountriesScreen extends Component {

    static navigationOptions = props => {
        const { navigate } = props.navigation;
        return {
            headerTitle: 'Talk2Go',
            headerStyle: HEADER_STYLE,
            headerTitleStyle: HEADER_TITLE_STYLE,
            headerLeft: null
        };
    };

    componentWillMount() {
        this.props.fetchCountries();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
        //FIX-ME: CONSIDER REMOVING THIS ONCE THE WELCOME SCREEN IS DEFINED
        this.setDefaultHomeCountry(nextProps);
    }

    setDefaultHomeCountry(nextProps) {
        const { countries, homeCountry, isLoading } = nextProps;
        if (!isLoading && isEmpty(homeCountry)) {
            const defaultCountry = countries.find(c => c.uuid == DEFAULT_COUNTRY_UUID)
            this.props.changeHomeCountry(defaultCountry);
        }
    }

    createDataSource({ countries }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(countries);
    } 

    onItemPress = (country) => {
        this.props.navigation.navigate('translation', { country });
    };

    onItemLongPress = (country) => {
        this.props.changeHomeCountry(country);
    };

    renderRow = (country) => {
        const selected = country.uuid === this.props.homeCountry.uuid;
        const countryImgUri = Expo.Asset.fromModule(_.get(iconFlags, country.name)).uri;
        return (
            <ListItem
                roundAvatar
                key={country.name}
                title={country.name}
                subtitle={country.native_name}
                avatar={{uri: countryImgUri}}
                containerStyle={[selected && { backgroundColor: '#b4e1ff' }]}

                // Press Props
                onPress={() => this.onItemPress(country)}
                onLongPress={() => this.onItemLongPress(country)}

                // Switch Props
                // onSwitch={() => this.onItemLongPress(country)}
                // switchButton
                // hideChevron
                // switchOnTintColor='#1f94d0'
                // switched={selected}
                // switchDisabled={selected}
            />
        );
    }

    onSearchChangeText = (text) => {
        this.props.updateCountriesFilter(text.toUpperCase());
    }

	render() {
        if (this.props.isLoading) {
            return <Spinner size="large" />;
        }
		return(
            <View style={{ flex: 1 }}>          
                <SearchBar
                    clearIcon
                    lightTheme
                    onChangeText={this.onSearchChangeText}
                />   
                <List containerStyle={{ flex:1, marginTop: 0}}>
                    <ListView
                        enableEmptySections
                        renderRow={this.renderRow}
                        dataSource={this.dataSource}
                    />
                </List>            
            </View>
		);
	}
}

const mapStateToProps = ({ countries: { data, filterBy, isLoading }, homeCountry }) => {
    const filteredData = filterBy ? data.filter(c => c.name.toUpperCase().startsWith(filterBy)) : data;
    return { countries: _.sortBy(filteredData, ['name']), isLoading, homeCountry };
}

const isEmpty = (obj) => {
    return !Object.keys(obj).length;
};

export default connect( mapStateToProps, actions )(CountriesScreen);
