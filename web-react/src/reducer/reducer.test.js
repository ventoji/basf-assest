import { filterChemicalNameReducer } from './reducer';
import { data1, data2 } from '../utils/datatest'
import {  groupingChemicalTypebyName } from '../utils/index'

it('set chemicals found with the same patentno', () => {
   console.log(data1.Chemical1); 
   

   const dataCH1 = groupingChemicalTypebyName(data1.Chemical1,'chenicaltype1')
   const dataCH2 = groupingChemicalTypebyName(data1.Chemical2,'chenicaltype2')

    console.log(dataCH1);
   const action = {
        type: 'SET_CURRENT_CHEMICAL_PATENT',
        payload: dataCH1
    } 
    
    //const state = filterChemicalNameReducer({},action)
    //console.log(state)
    //expect(state).toEqual(dataCH1)

  })
