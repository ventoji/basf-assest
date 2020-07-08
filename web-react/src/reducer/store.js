/**
 * Define a simple Redux store  to manage the query result
 * given by the chemicaltype name.
 * It also save the chemicaltype introduce by the
 * user in the Input Box
 */
import { rootReducer } from './reducer'
import { createStore, compose } from 'redux'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancers())

export default store
