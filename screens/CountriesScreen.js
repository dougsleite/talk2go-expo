import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, AsyncStorage, TouchableOpacity } from 'react-native';
import {  Avatar, Icon, Button } from 'react-native-elements';
import { connect } from 'react-redux';
import expo from 'expo';
import { HEADER_STYLE, HEADER_TITLE_STYLE } from '../styles/commons';
import { Spinner, MyListItem } from '../components';
import * as actions from '../actions';
import { changeHomeCountry } from '../actions';
import iconFlags from '../assets/icons/flags';

const BRAZIL_COUNTRY_UUID = '5870d25e-452e-4ba2-9d04-a8f37eca257f';

class CountriesScreen extends Component {

    static navigationOptions = props => {
        const { navigate }  = props.navigation;
        const params = props.navigation.state.params || {};
        return {
            headerTitle: 'TalkToGo',
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
                    avatarStyle={{
                        borderRadius: 16, 
                        borderColor:'#ffffff', 
                        borderWidth: 2
                    }}
                />
            ),
            headerRight: (
                <Icon
                    component={TouchableOpacity}
                    name='info-outline'
                    color='white'
                    size={26}
                    onPress={() => navigate('information')}
                    containerStyle={{paddingRight:15}}
                />             
            )
        };
    };

    state = {
        isLoadingHomeCountry: true,
        selectedIndex: 0
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
            const uuid = homeCountryUuid == null ? BRAZIL_COUNTRY_UUID : homeCountryUuid;
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

    onItemPress = (country) => {
        this.props.navigation.navigate('translation', { country, countryLangIdx: this.state.selectedIndex });
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
        this.setState({ selectedIndex });
        AsyncStorage.setItem('homeCountryLangIndex', String(selectedIndex));
    }

    createDataSource({ countries }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(countries);
    } 

    renderRow = (country, sectionID) => {
        const selected = country.uuid === this.props.homeCountry.uuid;
        const countryImgSrc= _.get(iconFlags, country.name);        
        return (
            <MyListItem 
                title={country.name}
                subtitle={country.native_name}
                avatarSrc={countryImgSrc}
                containerStyle={[selected && { backgroundColor: '#03A9F4' }]}
                onPress={() => this.onItemPress(country)}
                //onLongPress={() => this.onItemLongPress(country)}
            />
        );
    }

	render() {
        if (this.props.isLoading || this.state.isLoadingHomeCountry) {
            return <Spinner size="large" />;
        }

        // Button Group props
        const { homeCountry, countries } = this.props;
        const buttons = _.map( _.sortBy(homeCountry.languages, 'name'), i => i.name );

		return(
            <View style={{ flex: 1, backgroundColor: "white" }}>          
                {/* <SearchBar
                    ref={search => this.search = search}
                    //platform={Platform.OS}
                    onChangeText={this.onSearchChangeText}
                    placeholder="Search"
                    onCancel={() => this.search.clear()}
                />    */}
                {/* <ButtonGroup 
                    onPress={this.updateIndex}
                    selectedIndex={this.state.selectedIndex}
                    buttons={buttons}
                    containerStyle={styles.buttonGroupContainerStyle}
                    selectedButtonStyle={styles.buttonGroupSelectedButtonStyle}
                    selectedTextStyle={styles.buttonGroupSelectedTextStyle}
                /> */}
                <ListView
                    enableEmptySections
                    renderRow={this.renderRow}
                    dataSource={this.dataSource}
                />
            </View>
		);
	}
}

const mapStateToProps = ({ countries: { data, filterBy, isLoading, selectedIdx }, homeCountry }) => {
    //const filteredData = filterBy ? data.filter(c => c.name.toUpperCase().startsWith(filterBy)) : data;
    return { 
        //countries: _.sortBy(filteredData, ['name']), 
        countries: data,
        isLoading, 
        homeCountry
    };
}

const isEmpty = (obj) => {
    return !Object.keys(obj).length;
};

const styles = {
    buttonGroupContainerStyle: {
        height: 30,
    },
    buttonGroupSelectedButtonStyle: {
        backgroundColor: HEADER_STYLE.backgroundColor
    },
    buttonGroupSelectedTextStyle: {
        color: "white"
    }
};

export default connect( mapStateToProps, actions )(CountriesScreen);
