import {
    HOME_COUNTRY_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOME_COUNTRY_CHANGED:
            return action.payload;
        default:
            return state;
    }
};
