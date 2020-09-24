/**
 * Reducer: It has two main states, the filter query
 * and save the result
 */
import _ from 'lodash'
import { 
   findCommonPatentsNo,
   groupingChemicalTypebyName,
   addNewItemsWithSimilarPatents
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
    Chemical1: [],
    Chemical2: []
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
     //   console.log('action',action.payload.Chemical1)
     //   console.log('action',action.payload.Chemical2)
        console.log('state',state.chemicalPatents)
        let newState1 = [...state.chemicalPatents.Chemical1]
        let newState2 = [...state.chemicalPatents.Chemical2]

        console.log('NEW STATE -----------')
        console.log(newState1[_.size(newState1)-1])
        console.log('STATE 2')
        console.log(newState2)

        newState1 = addNewItemsWithSimilarPatents(action.payload.Chemical1,newState1,'chemicaltype1') 
        newState2 = addNewItemsWithSimilarPatents(action.payload.Chemical2,newState2,'chemicaltype2') 
      
        console.log('NEW STATE -----------')
        console.log(newState1)
        console.log('STATE 2')
        console.log(newState2)
/* 
        return {
          ...state, chemicalPatents: { 
            Chemical1: newState1,
            Chemical2: newState2
        } */
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
