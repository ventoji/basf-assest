import gql from 'graphql-tag'

export const createQueryForChemicalType = (listChemical, chemicaltype) => {
  /**
   * Get query for fetching chemical type list
   */
  return gql`
    {
      ${listChemical} {
        ${chemicaltype}
      }
    }
  `
}
export const createSearchedChemicalList = (chemical,chemicaltype) => {

   /**
   * Get query for fetching the searched chemical type by user
   */

  return gql`
  query(
    $first: Int
    $offset: Int
    $orderBy: [_${chemical}Ordering]
    $filter: _${chemical}Filter
  ) {
    ${chemical}(
      first: $first
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      patentno
      patenttile
      ${chemicaltype}
    }
  }
`

}

export const findEqualPatents = () => {

  /**
   *  Query for fetching other chemical types with the same pantent of the 
   *  current searched chemical type
   */

  return gql`
    query($patentno: String!){
    Chemical2(patentno: $patentno){
      chemicaltype2
    }
    Chemical1(patentno: $patentno){
      chemicaltype1
    }
  }
`

}

export const fetchChemicalTypeSearchedByUser = () => {

  /**
   *  query for fetching documents when user searched a chemical type
   *  by default all documents are fetched.
   */
  
return gql`
query($first: Int, $offset: Int, $orderby: [_ChemicalOrdering]) {
  listChemical(first: $first, offset: $offset, orderBy: $orderby) {
    patentno
    chemicaltype1
    chemicaltype2
    _id
  }
}
`
}

