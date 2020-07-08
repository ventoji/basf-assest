import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import InputBase from '@material-ui/core/InputBase'
import IconButton from '@material-ui/core/IconButton'
import DocumentContainer from '../container/DocumentContainer'

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  smallHeight: {
    height: 150,
    padding: 20,
  },
}))

export default function FilterInitial({ setFilterChemicalSearch }) {
  const [textFilter, setTextFilter] = useState('')
  const classes = useStyles()

  const handleSubmit = (e) => {
    console.log('submit action made', textFilter)
    e.preventDefault()
    if (textFilter.length > 0) {
      setFilterChemicalSearch(textFilter)
    }
  }

  const handleFilterChange = (e) => {
    console.log(e.target.value)
    const chemicalText = e.target.value
    setTextFilter(chemicalText)
  }

  return (
    <React.Fragment>
      <Paper onSubmit={handleSubmit} component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="e.g. Gelatin"
          inputProps={{ 'aria-label': 'search' }}
          onChange={handleFilterChange}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Paper className={classes.smallHeight}>
        <DocumentContainer />
      </Paper>
    </React.Fragment>
  )
}
