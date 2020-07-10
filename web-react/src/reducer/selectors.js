import _ from 'lodash'

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
        
            console.log(data[0])
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

export const filteredChemical1 = (data,name) => {
   //let {count,chemicalName} = {...rest}
    let count = data;
   console.log(count)

   console.log(data[0])

   if (name.length > 0) {
    count = _.filter(data, (o) => {
      return _.includes(o, name)
    })

    count = _.orderBy(count, name)

   }

    return count;
   
  /*   return data.filter((chemical,i) => {
      return chemical.name.toLowerCase().includes(chemicalName.toLowerCase());
    }); */
  }