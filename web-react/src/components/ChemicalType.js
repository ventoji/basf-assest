import React, { useState, useEffect } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
} from '@material-ui/core'

import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import Title from './Title'
import { groupingChemicalTypebyName } from '../utils'
/* 
const GET_CHEMICAL_TYPE11 = gql`  
query Chemical1PaginateQuery(
  $first: Int
  $offset: Int
  $orderBy: [_Chemcial1Ordering]
  $filter: _Chemcial1Filter
) {
  Chemcial1(
    first: $first
    offset: $offset
    orderBy: $orderBy
    filter: $filter
  ) {
    chemicaltype1
  }
}`

const GET_CHEMICAL_TYPE22 = gql`
query Chemical2PaginateQuery(
  $first: Int
  $offset: Int
  $orderBy: [_Chemcial2Ordering]
  $filter: _Chemcial2Filter
) {
  Chemcial2(
    first: $first
    offset: $offset
    orderBy: $orderBy
    filter: $filter
  ) {
    chemicaltype2
  }
}
`
 */
const GET_CHEMICAL_TYPES1 = gql`
  {
    listChemical1 {
      chemicaltype1
    }
  }
`

const GET_CHEMICAL_TYPES2 = gql`
  {
    listChemical2 {
      chemicaltype2
    }
  }
`

export default function ChemicalType({ typeC, name }) {
  const [chemicalType, setChemicalType] = useState(typeC)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('patenttile')
  // const [page] = useState(0)
  // const [rowsPerPage] = useState(12)
  //const [filterState, setFilterState] = useState({ chemicalFilter: '' })

  useEffect(() => {
    setChemicalType(typeC)
  }, [typeC])

  /*   const getFilter = () => {
    return filterState.chemicalFilter.length > 0
      ? { patenttile_contains: filterState.chemicalFilter }
      : {}
  } */

  const { loading, error, data } = useQuery(
    chemicalType === 1 ? GET_CHEMICAL_TYPES1 : GET_CHEMICAL_TYPES2
  )
  /* 
  const { loading, data, error } = useQuery(
    chemicalType === 1 ? GET_CHEMICAL_TYPE11 : GET_CHEMICAL_TYPE22 , {
    variables: {
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: orderBy + '_' + order,
      filter: getFilter(),
    },
  }) */

  const handleSortRequest = (property) => {
    const newOrderBy = property
    let newOrder = 'desc'

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc'
    }

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Chemical Type {typeC}</Title>
      <p> {name}</p>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              key="patenttile"
              sortDirection={orderBy === 'patenttile' ? order : false}
            >
              <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                <TableSortLabel
                  active={orderBy === 'patenttile'}
                  direction={order}
                  onClick={() => handleSortRequest('patenttile')}
                >
                  Name
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell>Documents</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupingChemicalTypebyName(
            chemicalType === 1 ? data.listChemical1 : data.listChemical2,
            name
          ).map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  )
}
