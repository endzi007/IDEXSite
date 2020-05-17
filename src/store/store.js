import { createStore, combineReducers, applyMiddleware } from 'redux';
import projectReducer from '../projectsDuck/projectsDuck';
import appConfigReducer from '../appConfig/appConfigDuck';

import {defaultState as appConfig } from '../appConfig/appConfigDuck';
import { defaultState as projects } from '../projectsDuck/projectsDuck';
import appInfoAndLinksReducer, { defaultState as appInfoAndLinks } from '../appInfoAndLinks/appInfoAndLinksDuck.js';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const defaultState = {
    projects: {...projects}, 
    appConfig: {...appConfig},
    appInfoAndLinks: {...appInfoAndLinks}
}
window.state = defaultState;
const reducers = combineReducers({
    projects: projectReducer,
    appConfig: appConfigReducer,
    appInfoAndLinks: appInfoAndLinksReducer

});
const store = createStore(reducers, defaultState, applyMiddleware(thunk, logger));

export default store;