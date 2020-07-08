import gql from 'graphql-tag'

export const createQueryForChemicalType = (listChemical, chemicaltype) => {
  console.log(listChemical, chemicaltype)
  const GET_CHEMICAL_TYPE = gql`
    {
      ${listChemical} {
        ${chemicaltype}
      }
    }
  `
  console.log(GET_CHEMICAL_TYPE)
  return GET_CHEMICAL_TYPE
}
