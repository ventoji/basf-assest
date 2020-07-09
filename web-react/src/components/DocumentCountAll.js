import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { filterByName } from '../utils/index'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
  },
})

const GET_CHEMICAL_SEARCH = gql`
  query($first: Int, $offset: Int, $orderby: [_ChemicalOrdering]) {
    listChemical(first: $first, offset: $offset, orderBy: $orderby) {
      patentno
      chemicaltype1
      chemicaltype2
      _id
    }
  }
`
export default function DocumentCountAll({
  chemicalName,
  setCurrentChemicalSearch,
}) {
  const classes = useStyles()

  // const [chemicalType, setChemicalType] = useState()
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

  const { loading, data, error } = useQuery(GET_CHEMICAL_SEARCH, {
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

    //  setFilterState({ chemicalFilter: chemicalName })
  }, [chemicalName])

  if (error) return <p>Error</p>
  return (
    <React.Fragment>
      <Title>Total Documents {fecthResult}</Title>
      <Typography component="p" variant="h4">
        {loading
          ? 'Loading...'
          : filterByName(data.listChemical, chemicalName).length}
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
