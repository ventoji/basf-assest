import _ from 'lodash'

/** Function to count the number of documents
 *  according to chemicaltype propertie.
 */
export const groupingChemicalTypebyName = (data, name) => {
  const count = _(data)
    .groupBy(name)
    .map((items, name) => ({ name, count: items.length }))
    .value()

  return count
}
