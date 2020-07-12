import _ from 'lodash'

export const filteredPatent = (listPatents) => {
   // console.log('listpaten',listPatents)
  /*   return {
        chemical1: groupingChemicalTypebyName(listPatents.Chemical1,'chemicaltype1'),
        chemical2: groupingChemicalTypebyName(listPatents.Chemical2,'chemicaltype2')
    } */

    return {
      chemical1: listPatents.Chemical1,
      chemical2: listPatents.Chemical2
  }
}

export const filteredChemical = (listChemical, {chemicalName}) => {

    let data = listChemical
    let totalDocuments = _.size(data)
    let type;

    if (chemicalName.length > 0) {
        data = _.filter(listChemical, (o) => {
          return _.includes(o, chemicalName)
        })
    
        data = _.orderBy(data, chemicalName)
        totalDocuments = _.size(data)

        if (totalDocuments) {
        
          //  console.log(data[0])
            if (data[0].chemicaltype1 !==null){
                type = 1
            }else{
               
                type = 2
            }
        }
       }
  
     return {
         listChemical: data,
         totalDocuments: totalDocuments,
         typeChemical: type
     }
    
   }
