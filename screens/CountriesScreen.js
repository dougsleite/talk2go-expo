import _ from 'lodash';
import React, { Component } from 'react';
import { ListView, View, TouchableOpacity } from 'react-native';
import {  Avatar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { HEADER_STYLE, HEADER_TITLE_STYLE } from '../styles/commons';
import { Spinner, ListItem } from '../components';
import { changeHomeCountry } from '../actions';

import expo from 'expo';
import iconFlags from '../assets/icons/flags';

import * as actions from '../actions';

const BRAZIL_COUNTRY_UUID = '5870d25e-452e-4ba2-9d04-a8f37eca257f';

class CountriesScreen extends Component {

    static navigationOptions = props => {
        const { navigate }  = props.navigation;
        const params = props.navigation.state.params || {};
        return {
            headerTitle: 'Talk \'n\' Go',
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
            const defaultCountry = countries.find(c => c.uuid == BRAZIL_COUNTRY_UUID);
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
        this.props.navigation.navigate('translation', { country, countryLangIdx: 0 });
    };

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
            <ListItem 
                title={country.name}
                subtitle={country.native_name}
                avatarSrc={countryImgSrc}
                containerStyle={[selected && { backgroundColor: '#03A9F4' }]}
                onPress={() => this.onItemPress(country)}
            />
        );
    }

	render() {
        if (this.props.isLoading || this.state.isLoadingHomeCountry) {
            return <Spinner size="large" />;
        }
		return(
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <ListView
                    enableEmptySections
                    renderRow={this.renderRow}
                    dataSource={this.dataSource}
                />
            </View>
		);
	}
}

const mapStateToProps = ({ countries: { data, isLoading }, homeCountry }) => {
    return { 
        countries: data,
        isLoading, 
        homeCountry
    };
}

const isEmpty = (obj) => {
    return !Object.keys(obj).length;
};

export default connect( mapStateToProps, actions )(CountriesScreen);
