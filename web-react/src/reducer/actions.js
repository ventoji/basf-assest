/**
 * Actions defined for the reducer
 */
export const SET_CURRENT_CHEMICAL_SEARCH = 'SET_CURRENT_CHEMICAL_SEARCH'
export const SET_CHEMICALNAME_FILTER = 'SET_CHEMICALNAME_FILTER'

export const setCurrentChemicalSearch = (result) => ({
  type: SET_CURRENT_CHEMICAL_SEARCH,
  payload: result,
})

export const setFilterChemicalSearch = (result) => ({
  type: SET_CHEMICALNAME_FILTER,
  payload: result,
})
