import React, { useState, useEffect } from 'react'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { useQuery } from '@apollo/react-hooks'
// import gql from 'graphql-tag'
import Title from './Title'
import { groupingChemicalTypebyName } from '../utils'
import { createQueryForChemicalType } from './apiRest'
/* 
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
` */

export default function ChemicalType({ listChemical, name }) {
  const [chemicalType, setChemicalType] = useState()

  useEffect(() => {
    setChemicalType(listChemical.match(/\d+/)[0])
  }, [listChemical])

  /*   const { loading, error, data } = useQuery(
    chemicalType === 1 ? GET_CHEMICAL_TYPES1 : GET_CHEMICAL_TYPES2
  ) */
  const { loading, error, data } = useQuery(
    createQueryForChemicalType(listChemical, name)
  )

  if (error) return <p>Error</p>
  if (loading) return <p>Loading</p>

  return (
    <React.Fragment>
      <Title>Chemical Type {chemicalType}</Title>
      <p> {name}</p>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Documents</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupingChemicalTypebyName(
            chemicalType === 2 ? data.listChemical1 : data.listChemical2,
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
