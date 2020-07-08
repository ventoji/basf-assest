import React from 'react'
import { useTheme } from '@material-ui/core/styles'
import { Grid, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

// import RatingsChart from './RatingsChart'
import FilterContainer from '../container/FilterContainer'
// cimport RecentReviews from './RecentReviews'
import ChemicalType from './ChemicalType'

export default function Dashboard() {
  const theme = useTheme()

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      padding: theme.spacing(2),
      display: 'flex',
      overflow: 'auto',
      flexDirection: 'column',
    },
    fixedHeight: {
      height: 440,
    },
  }))
  const classes = useStyles(theme)
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)

  return (
    <React.Fragment>
      <Grid container spacing={4}>
        {/* Recent Reviews */}
        <Grid item xs={12}>
          <FilterContainer />
        </Grid>
        {/* Document Count */}
        <Grid item xs={12}></Grid>
        {/* Chemical Type 1 */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <ChemicalType typeC={1} name="chemicaltype1" />
          </Paper>
        </Grid>
        {/* Chemical type 2 */}
        <Grid item xs={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
            <ChemicalType typeC={2} name="chemicaltype2" />
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
