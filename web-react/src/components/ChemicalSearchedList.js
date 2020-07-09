import React, { useEffect } from 'react'
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
  TableContainer,
  TablePagination,
} from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import VisibilityIcon from '@material-ui/icons/Visibility'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import List from '@material-ui/core/List'
// import SelectEntriesChemical from './SelectEntriesChemical';
import Title from './Title'
import Link from '@material-ui/core/Link'

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
  listIcons: {
    display: 'flex',
    flexDirection: 'row',
  },
  icon: {
    padding: 5,
  },
})

const GET_CHEMICAL_TYPE1 = gql`
  query(
    $first: Int
    $offset: Int
    $orderBy: [_Chemical1Ordering]
    $filter: _Chemical1Filter
  ) {
    Chemical1(
      first: $first
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      patentno
      patenttile
      chemicaltype1
    }
  }
`

const GET_CHEMICAL_TYPE2 = gql`
  query(
    $first: Int
    $offset: Int
    $orderBy: [_Chemical2Ordering]
    $filter: _Chemical2Filter
  ) {
    Chemical2(
      first: $first
      offset: $offset
      orderBy: $orderBy
      filter: $filter
    ) {
      patentno
      patenttile
      chemicaltype2
    }
  }
`

function ChemicalSearchedList({
  classes,
  chemicalSearch,
  chemicalName,
  chemicalType,
}) {
  //const { classes } = props
  //const classes = styles();
  // const [userData, setUserData] = useState({});

  const [order, setOrder] = React.useState('asc')
  const [orderBy, setOrderBy] = React.useState('patenttile')
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(12)
  const [filterState, setFilterState] = React.useState({ chemicalFilter: '' })

  useEffect(() => {
    // console.log(chemicalSearch)
    // setUserData(chemicalSearch)

    setFilterState({ chemicalFilter: chemicalName })
  }, [chemicalSearch])
  const getFilter = () => {
    return filterState.chemicalFilter.length > 0
      ? { chemicaltype1_contains: filterState.chemicalFilter }
      : {}
  }

  const { loading, data, error } = useQuery(
    chemicalType === 1 ? GET_CHEMICAL_TYPE1 : GET_CHEMICAL_TYPE2,
    {
      variables: {
        first: rowsPerPage,
        offset: rowsPerPage * page,
        orderBy: orderBy + '_' + order,
        filter: getFilter(),
      },
    }
  )

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

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  return (
    <Paper className={classes.root}>
      <Title>Search</Title>
      <TextField
        id="search"
        label="Chemical Type Name"
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
        <div>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            component="div"
            count={
              chemicalType === 1 ? data.Chemical1.length : data.Chemical2.length
            }
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <TableContainer>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell
                    key="patentno"
                    sortDirection={orderBy === 'patentno' ? order : false}
                  >
                    <Tooltip
                      title="Sort"
                      placement="bottom-start"
                      enterDelay={300}
                    >
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
                    <Tooltip
                      title="Sort"
                      placement="bottom-end"
                      enterDelay={300}
                    >
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
                {(chemicalType === 1 ? data.Chemical1 : data.Chemical2).map(
                  (n, index) => {
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
                          <List className={classes.listIcons}>
                            <ListItem button className={classes.icon}>
                              <ListItemIcon>
                                <Link
                                  target="_blank"
                                  rel="noopener"
                                  href={`https://patents.google.com/patent/${n.patentno}`}
                                  color="inherit"
                                >
                                  <PictureAsPdfIcon />
                                </Link>
                              </ListItemIcon>
                            </ListItem>
                            <ListItem button className={classes.icon}>
                              <ListItemIcon>
                                <Link
                                  target="_blank"
                                  rel="noopener"
                                  href={`https://patents.google.com/patent/${n.patentno}`}
                                  color="inherit"
                                >
                                  <VisibilityIcon />
                                </Link>
                              </ListItemIcon>
                            </ListItem>
                          </List>
                        </TableCell>
                      </TableRow>
                    )
                  }
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </Paper>
  )
}

export default withStyles(styles)(ChemicalSearchedList)
