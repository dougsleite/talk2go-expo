import {
    HOME_COUNTRY_CHANGED,
    HOME_COUNTRY_LANG_INDX
} from '../actions/types';

const INITIAL_STATE = {
    data: {},
    selectedIndex: 0
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case HOME_COUNTRY_CHANGED:
            return { ...state, data: action.payload };
        case HOME_COUNTRY_LANG_INDX:
            return { ...state, selectedIndex: action.payload.index };
        default:
            return state;
    }
};
