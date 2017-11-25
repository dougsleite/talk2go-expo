import { combineReducers } from 'redux';
import countries from './countries_reducer';
import homeCountry  from './home_country_reducer';

export default combineReducers({
    countries, homeCountry
});
