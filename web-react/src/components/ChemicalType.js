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
import Title from './Title'
import { groupingChemicalTypebyName } from '../utils'
import { createQueryForChemicalType } from '../utils/generateQueries'


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

  const { loading, error, data } = useQuery (createQueryForChemicalType(`listChemical${chemicalType}`,name))

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
      <Title>Chemical Type {chemicalType}</Title>
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
            data[`listChemical${chemicalType}`],
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
