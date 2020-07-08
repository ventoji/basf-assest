/** Rerender component whenever a filter text changes
 *  and show count and link for display in other page
 */
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
  },
})

const GET_CHEMICAL_SEARCH = gql`
  query(
    $first: Int
    $offset: Int
    $orderby: [_Chemcial1Ordering]
    $filter: _Chemcial1Filter
  ) {
    Chemcial1(
      first: $first
      offset: $offset
      orderBy: $orderby
      filter: $filter
    ) {
      patenttile
      chemicaltype1
    }
  }
`
export default function Deposits({ chemicalName, setCurrentChemicalSearch }) {
  const classes = useStyles()

  const [order] = useState('asc')
  const [orderBy] = useState('patenttile')
  const [page] = useState(1)
  const [rowsPerPage] = useState(-1)
  const [filterState, setFilterState] = useState({ chemicalFilter: '' })
  const [fecthResult, setfetchResult] = useState(chemicalName)

  const getFilter = () => {
    return filterState.chemicalFilter.length > 0
      ? { chemicaltype1_contains: filterState.chemicalFilter }
      : {}
  }

  const { loading, data, error } = useQuery(GET_CHEMICAL_SEARCH, {
    variables: {
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: orderBy + '_' + order,
      filter: getFilter(),
    },
    onCompleted: setCurrentChemicalSearch,
  })

  useEffect(() => {
    setfetchResult(chemicalName)
    setFilterState({ chemicalFilter: chemicalName })
  }, [chemicalName])

  if (error) return <p>Error</p>
  return (
    <React.Fragment>
      <Title>Total Documents {fecthResult}</Title>
      <Typography component="p" variant="h4">
        {loading ? 'Loading...' : data.Chemcial1.length}
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
