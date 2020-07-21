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
  //  console.log(body)
  console.log('--------------')
  const records = parse(body, {
    columns: true,
    delimiter: ';',
  })
  console.log('records')
  // console.log(records);
  console.log('--------------')
  const mutations = generateMutations(records)
  //const mutations = [];
  //console.log(mutations);
  console.log('mutations after beeing called')
  console.log(mutations)
  console.log('--------------')
  return mutations
}

/*
{ mutation: { kind: 'Document', definitions: [Array], loc: [Object] },
    variables:
     { patentno: 'US10188696',
       patenttitle: 'PHARMACEUTICAL COMPOSITIONS',
       chemicaltype1: 'Vitamin E' }
       */
const generateMutations = (records) => {
  //return records
  return records.map((rec) => {
    console.log('item', rec)
    Object.keys(rec).map((k) => {
      renameKeys(rec, k)
    })

    return {
      mutation: gql`
        mutation mergeChemicals(
          $patentno: String!
          $patenttitle: String!
          $chemicaltype1: String!
        ) {
          chemicalpatent: MergeChemical1(
            patentno: $patentno
            patenttitle: $patenttitle
          ) {
            patentno
            patenttitle
          }
          chemicaltype: MergeChemicalType1(chemicaltype1: $chemicaltype1) {
            chemicaltype1
          }
        }
      `,
      variables: rec,
    }
  })
}
