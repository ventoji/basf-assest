/**
 * Reducer: It has two main states, the filter query
 * and save the result
 */

import { combineReducers } from 'redux'
import {
  SET_CHEMICALNAME_FILTER,
  SET_CURRENT_CHEMICAL_SEARCH,
  SET_CHEMICAL_TYPE,
} from './actions'

const filterReducerDefaultState = {
  chemicalName: '',
  chemicalType: 1,
}

export const filterChemicalNameReducer = (
  state = filterReducerDefaultState,
  action
) => {
  switch (action.type) {
    case SET_CHEMICALNAME_FILTER:
      return {
        ...state,
        chemicalName: action.payload,
      }
    case SET_CHEMICAL_TYPE:
      return {
        ...state,
        chemicalType: action.payload,
      }
    default:
      return state
  }
}

export const currentChemicalSearchReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CURRENT_CHEMICAL_SEARCH:
      //  console.log(action);
      return action.payload
    default:
      return state
  }
}

export const rootReducer = combineReducers({
  filter: filterChemicalNameReducer,
  chemicalSearch: currentChemicalSearchReducer,
})
