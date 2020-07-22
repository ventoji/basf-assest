import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import { useQuery } from '@apollo/react-hooks'
import { fetchChemicalTypeSearchedByUser } from '../utils/generateQueries'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
  },
})

export default function DocumentCountAll({
  chemicalName,
  chemicalSearch,
  setChemicalType,
  setCurrentChemicalSearch,
}) {
  const classes = useStyles()

  //const [chemicalType, setChemicalType] = useState()
  const [order] = useState('asc')
  const [orderBy] = useState('patenttile')
  const [page] = useState(1)
  const [rowsPerPage] = useState(-1)
  // const [filterState, setFilterState] = useState({ chemicalFilter: '' })
  const [fecthResult, setfetchResult] = useState('')

  /*   const getFilter = () => {
    return filterState.chemicalFilter.length > 0
      ? { chemicaltype1_contains: filterState.chemicalFilter }
      : {}
  } */

  const { loading, data, error } = useQuery(fetchChemicalTypeSearchedByUser(), {
    variables: {
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: orderBy + '_' + order,
    },
    onCompleted: setCurrentChemicalSearch,
  })

  useEffect(() => {
    /** Rerender component whenever a filter text changes
     *  and show count and link for display in other page
     */
    setfetchResult(chemicalName)
    setChemicalType(chemicalSearch.typeChemical)

    //  setFilterState({ chemicalFilter: chemicalName })
  }, [chemicalName])

  if (error) return <p>Error</p>
 // if (!loading) return setChemicalType(chemicalSearch.typeChemical)
  return (
    <React.Fragment>
      <Title>Total Documents {fecthResult}</Title>
      <Typography component="p" variant="h4">
        {loading
          ? 'Loading...'
          : chemicalSearch.totalDocuments}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        documents found
      </Typography>
      <div>
        <Link to="/chemicaltype" className={classes.navLink}>
          View documents
        </Link>
      </div>
    </React.Fragment>
  )
}
