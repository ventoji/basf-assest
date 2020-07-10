import _ from 'lodash'
// import { setCurrentChemicalSearch, setChemicalType } from '../reducer/actions'
// import store from '../reducer/store'

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

/* export const filterByName = (data, name) => {
  console.log(data[0], name)
  if (data[0].chemicaltype2 !== null) {
    store.dispatch(setChemicalType(2))
  } else {
    store.dispatch(setChemicalType(1))
  }
  let count
  if (name.length > 0) {
    count = _.filter(data, (o) => {
      return _.includes(o, name)
    })

    count = _.orderBy(count, name)
    store.dispatch(setCurrentChemicalSearch(count))
    // console.log('count',count);
    return count
  }

  return data
} */
