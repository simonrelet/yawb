import { combineReducers } from 'redux';
import defaultState from './defaultState';
import { APP_UPDATE, CHANGE_THEME } from './actions';

const hasNewVersion = (state = defaultState.hasNewVersion, action) => {
  switch (action.type) {
    case APP_UPDATE:
      return true;
    default:
      return state;
  }
};

const theme = (state = defaultState.theme, action) => {
  switch (action.type) {
    case CHANGE_THEME:
      return action.theme;
    default:
      return state;
  }
};

export default combineReducers({
  hasNewVersion,
  theme,
});
