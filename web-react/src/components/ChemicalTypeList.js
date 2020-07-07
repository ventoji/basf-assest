import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { withStyles } from '@material-ui/core/styles'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  Paper,
  TableSortLabel,
  TextField,
} from '@material-ui/core'
import VisibilityIcon from '@material-ui/icons/Visibility'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
// import SelectEntriesChemical from './SelectEntriesChemical';
import Title from './Title'

const styles = (theme) => ({
  root: {
    maxWidth: 700,
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
  },
})

const GET_CHEMICAL_TYPE = gql`
  query usersPaginateQuery(
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
      patentno
      patenttile
    }
  }
`
/* const GET_USER = gql`
  query usersPaginateQuery(
    $first: Int
    $offset: Int
    $orderBy: [_UserOrdering]
    $filter: _UserFilter
  ) {
    User(first: $first, offset: $offset, orderBy: $orderBy, filter: $filter) {
      id: userId
      name
      avgStars
      numReviews
    }
  }
` */

function UserList(props) {
  const { classes } = props
  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('patenttile')
  const [page] = React.useState(0)
  const [rowsPerPage] = React.useState(12)
  const [filterState, setFilterState] = React.useState({ chemicalFilter: '' })

  const getFilter = () => {
    return filterState.chemicalFilter.length > 0
      ? { patenttile_contains: filterState.chemicalFilter }
      : {}
  }

  const { loading, data, error } = useQuery(GET_CHEMICAL_TYPE, {
    variables: {
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: orderBy + '_' + order,
      filter: getFilter(),
    },
  })

  const handleSortRequest = (property) => {
    const newOrderBy = property
    let newOrder = 'desc'

    if (orderBy === property && order === 'desc') {
      newOrder = 'asc'
    }

    setOrder(newOrder)
    setOrderBy(newOrderBy)
  }

  const handleFilterChange = (filterName) => (event) => {
    const val = event.target.value

    console.log(val)

    setFilterState((oldFilterState) => ({
      ...oldFilterState,
      [filterName]: val,
    }))
  }

  return (
    <Paper className={classes.root}>
      <Title>Search</Title>
      <TextField
        id="search"
        label="Chemical Patent No"
        className={classes.textField}
        value={filterState.chemicalFilter}
        onChange={handleFilterChange('chemicalFilter')}
        margin="normal"
        variant="outlined"
        type="text"
        InputProps={{
          className: classes.input,
        }}
      />
      {loading && !error && <p>Loading...</p>}
      {error && !loading && <p>Error</p>}
      {data && !loading && !error && (
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell
                key="patentno"
                sortDirection={orderBy === 'patentno' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-start" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'patentno'}
                    direction={order}
                    onClick={() => handleSortRequest('patentno')}
                  >
                    docId
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell
                key="patenttile"
                sortDirection={orderBy === 'patenttile' ? order : false}
              >
                <Tooltip title="Sort" placement="bottom-end" enterDelay={300}>
                  <TableSortLabel
                    active={orderBy === 'patenttile'}
                    direction={order}
                    onClick={() => handleSortRequest('patenttile')}
                  >
                    Title
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.Chemcial1.map((n, index) => {
              return (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {index + 1}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {n.patentno}
                  </TableCell>
                  <TableCell>{n.patenttile}</TableCell>
                  <TableCell>
                    <PictureAsPdfIcon />
                    <VisibilityIcon />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      )}
    </Paper>
  )
}

export default withStyles(styles)(UserList)
