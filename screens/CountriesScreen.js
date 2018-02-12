import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, Text, AsyncStorage} from 'react-native';
import { List, ListItem, SearchBar, Avatar, ButtonGroup } from 'react-native-elements';
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
        const { navigate }  = props.navigation;
        const params = props.navigation.state.params || {};
        return {
            headerTitle: 'Talk2Go',
            headerStyle: HEADER_STYLE,
            headerTitleStyle: HEADER_TITLE_STYLE,
            headerLeft: (
                <Avatar
                    small
                    rounded
                    source={{uri: params.countryImgUri }}
                    activeOpacity={0.9}
                    containerStyle={{paddingLeft: 60}}
                    overlayContainerStyle={HEADER_STYLE}
                    avatarStyle={{borderRadius: 16, borderColor:'white', borderWidth: 2}}
                />
            ),
        };
    };

    state = {
        isLoadingHomeCountry: true
    }

    componentWillMount() {
        this.props.fetchCountries();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
        this.setDefaultHomeCountry(nextProps);
    }

    setDefaultHomeCountry = async (nextProps) => {
        const { countries, homeCountry, isLoading } = nextProps;
        if (!isLoading && isEmpty(homeCountry)) {

            let homeCountryLangIndex = await AsyncStorage.getItem('homeCountryLangIndex');
            if (homeCountryLangIndex) {
                this.updateIndex(parseInt(homeCountryLangIndex));
            }

            let homeCountryUuid = await AsyncStorage.getItem('homeCountryUuid');
            const uuid = homeCountryUuid == null ? DEFAULT_COUNTRY_UUID : homeCountryUuid;
            const defaultCountry = countries.find(c => c.uuid == uuid)
            this.props.changeHomeCountry(defaultCountry);
            this.setHeaderFlag(defaultCountry);

            this.setState({ isLoadingHomeCountry: false });
        }
    }

    setHeaderFlag(country) {
        const countryImgUri = Expo.Asset.fromModule(_.get(iconFlags, country.name)).uri;
        this.props.navigation.setParams({ countryImgUri });
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
        this.updateIndex(0);
        this.setHeaderFlag(country);
    };

    onSearchChangeText = (text) => {
        this.props.updateCountriesFilter(text.toUpperCase());
    }

    updateIndex = (selectedIndex) => {
        this.props.setHomeCountryLanguage(selectedIndex);
        AsyncStorage.setItem('homeCountryLangIndex', String(selectedIndex));
    }

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
            />
        );
    }

	render() {
        if (this.props.isLoading || this.state.isLoadingHomeCountry) {
            return <Spinner size="large" />;
        }

        // Button Group props
        const { homeCountry, selectedIndex } = this.props;
        const buttons = _.map( _.sortBy(homeCountry.languages, 'name'), i => i.name );

		return(
            <View style={{ flex: 1 }}>          
                <SearchBar
                    clearIcon
                    lightTheme
                    onChangeText={this.onSearchChangeText}
                />   
                <ButtonGroup 
                    onPress={this.updateIndex}
                    selectedIndex={selectedIndex}
                    buttons={buttons}
                    containerStyle={{height: 30}}
                    selectedBackgroundColor="#b4e1ff"
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

const mapStateToProps = ({ countries: { data, filterBy, isLoading, selectedIdx }, homeCountry }) => {
    const filteredData = filterBy ? data.filter(c => c.name.toUpperCase().startsWith(filterBy)) : data;
    return { 
        countries: _.sortBy(filteredData, ['name']), 
        isLoading, 
        homeCountry: homeCountry.data,
        selectedIndex: homeCountry.selectedIndex
    };
}

const isEmpty = (obj) => {
    return !Object.keys(obj).length;
};

export default connect( mapStateToProps, actions )(CountriesScreen);
