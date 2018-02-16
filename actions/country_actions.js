import axios from 'axios';
import { AsyncStorage } from 'react-native';
import country_data from '../assets/data/country';

import {
    COUNTRIES_FETCH_SUCCESS,
    COUNTRIES_FILTER_UPDATED,
    HOME_COUNTRY_CHANGED
} from './types';

const FETCH_JOB_URL = 'https://us-central1-talk2go-acfdf.cloudfunctions.net/fetchListCountries';

// export const fetchCountries = () => async (dispatch) => {
//     let { data } = await axios.get(FETCH_JOB_URL);
//     dispatch({ type: COUNTRIES_FETCH_SUCCESS, payload: data });
// };

export const fetchCountries = () => {
    return { type: COUNTRIES_FETCH_SUCCESS, payload: country_data.countries };
};

export const updateCountriesFilter = (text) => {
    return {
        type: COUNTRIES_FILTER_UPDATED,
        payload: { text }
    };
};

export const changeHomeCountry = (country) => {
    AsyncStorage.setItem('homeCountryUuid', country.uuid);
    return {
        type: HOME_COUNTRY_CHANGED,
        payload: country
    };
};