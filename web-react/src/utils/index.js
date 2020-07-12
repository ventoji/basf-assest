import _ from 'lodash'
// import { setCurrentChemicalSearch, setChemicalType } from '../reducer/actions'
// import store from '../reducer/store'

/** Function to count the number of documents
 *  according to chemicaltype propertie.
 */
export const groupingChemicalTypebyName = (data, name) => {
  if(_.size(data)===0){
    return data
  }
  const count = _(data)
    .groupBy(name)
    .map((items, name) => ({ name, count: items.length }))
    .value()

  return count
}

export const findCommonPatentsNo = (data, newState) => {

 //  console.log(data);

   if(_.size(data)===0){
     return  newState;
   }

   if(_.size(newState)===0){
     return data;
   }

  _.map(newState, (chem) =>{

    const indexObj = _.findIndex(data,chem);

    if(indexObj!==-1){
        let currentCount = data[indexObj].count;
        data[indexObj].count= currentCount+1

       
    }else{
          data = [
            chem,...data, 
          ] 
    }
})
  return data
}


