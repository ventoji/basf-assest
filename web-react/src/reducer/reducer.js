/**
 * Reducer: It has two main states, the filter query
 * and save the result
 */
 import { 
   findCommonPatentsNo,
   groupingChemicalTypebyName 
  } from '../utils';
 

import { combineReducers } from 'redux'
import {
  SET_CHEMICALNAME_FILTER,
  SET_CURRENT_CHEMICAL_SEARCH,
  SET_CHEMICAL_TYPE,
  SET_CURRENT_CHEMICAL_PATENT
} from './actions'

const filterReducerDefaultState = {
  chemicalName: '',
  chemicalType: 1,
  chemicalPatents: {
    Chemical1: {},
    Chemical2: {}
  }
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
      case SET_CURRENT_CHEMICAL_PATENT:
       // console.log('action',action.payload.Chemical1)
       // console.log('action',action.payload.Chemical2)
       // console.log('state',state.chemicalPatents)
      
        return {
          ...state, chemicalPatents: { 
             Chemical1: findCommonPatentsNo(
              state.chemicalPatents.Chemical1,
             groupingChemicalTypebyName(action.payload.Chemical1,'chemicaltype1')
             ),
             Chemical2:findCommonPatentsNo(
              state.chemicalPatents.Chemical2,
              groupingChemicalTypebyName(action.payload.Chemical2,'chemicaltype2' )
              ) 
            }
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
