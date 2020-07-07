export const renameKeys = (o, oldKey) => {
  //console.log(typeof(oldKey))
  //  const newKey = _.trim(oldKey);
  const newKey = oldKey.replace(/\s+/g, '')
  // console.log('newkey',newKey.trim(' '))
  delete Object.assign(o, { [newKey]: o[oldKey] })[oldKey]
}
