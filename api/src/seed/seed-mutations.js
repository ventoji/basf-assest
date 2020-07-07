const fetch = require('node-fetch')
const parse = require('csv-parse/lib/sync')
const gql = require('graphql-tag')
import { renameKeys } from './utils'

export const getSeedMutations = async () => {
  const res = await fetch(
    'https://raw.githubusercontent.com/ventoji/chemicals/master/chemical_type_1.csv'
  )
  const body = await res.text()
  /*    console.log(parse(body, { 
     columns: true,
     delimiter: ';' 
    })) */
  console.log('body')
  console.log(body)
  console.log('--------------')
  const records = parse(body, {
    columns: true,
    delimiter: ';',
  })
  console.log('records')
  //console.log(records);
  console.log('--------------')
  const mutations = generateMutations(records)
  //const mutations = [];
  //console.log(mutations);
  console.log('mutations')
  // console.log(mutations);
  console.log('--------------')
  return mutations
}

const generateMutations = (records) => {
  //return records
  return records.map((rec) => {
    //  console.log('item',rec);
    Object.keys(rec).map((k) => {
      renameKeys(rec, k)
    })

    return {
      mutation: gql`
        mutation mergeChemicalType1(
          $patentno: String!
          $patenttitle: String
          $chemicaltype1: String
        ) {
          chemical1: chemicalList1(patentno: $patentno) {
            patentno
            patenttitle
          }
        }
      `,
      variables: rec,
    }
  })
}
