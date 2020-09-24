import _ from 'lodash'
import ChemicalType from '../components/ChemicalType'
// import { setCurrentChemicalSearch, setChemicalType } from '../reducer/actions'
// import store from '../reducer/store'

/** Function to count the number of documents
 *  according to chemicaltype propertie.
 */
export const groupingChemicalTypebyName = (data, name) => {
  console.log('groupin',data)
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
        console.log('new element');
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

export const addNewItemsWithSimilarPatents = (data,newState,chemicaltype)=>{
  let counter;
  let stateWithPatent=[...newState]

  console.log('-------------DATA-----------')
  console.log(data)
  console.log('--------------')
  console.log(newState)
  console.log('--------------')
  console.log(chemicaltype)
  console.log('--------------')


   if(_.size(newState)===0 ){
    console.log('first time ')
    newState= groupingChemicalTypebyName(data,chemicaltype)
    console.log(newState)
    return newState
  }  

 /*  if(_.size(newState)>0 && _.size(data)===0){
    return newState
  } */
  return _.map(data, (item)=> {
    const indexFound=_.findIndex(newState, ['name',item[chemicaltype]]);
    console.log('index',indexFound);
  
    if(indexFound!==-1){
       console.log('true: found similars',item.chemicaltype1)
       counter=newState[indexFound].count;
       counter++
       newState[indexFound]={...newState[indexFound],count:counter}          
       
     }
     else{
     //  console.log('false:find new item')
       newState = [...newState,{name:item[chemicaltype],count:1}]
     }
     return newState
   })
   console.log('----FORMAT OUTPUT----------')
   console.log(stateWithPatent)
   console.log('--------------')
   return stateWithPatent
}


