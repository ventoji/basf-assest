import _ from 'lodash'

export const groupingChemicalTypebyName = (data, name) => {
  console.log(name)
  const count = _(data)
    .groupBy(name)
    .map((items, name) => ({ name, count: items.length }))
    .value()

  console.log(count)

  return count
}
