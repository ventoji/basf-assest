import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Link from '@material-ui/core/Link'

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  text: {
    padding: 20,
  },
}))

export default function SimplePaper() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Typography className={classes.text} component="p" variant="body1">
          This project uses GrandStack template for rendering a database using
          Neo4j, Graphql and React for building the UI. You have to insert a
          chemical type name such as appear from the database and then click
          enter to see how many documents this chemical type appear.
        </Typography>

        <Typography className={classes.text} component="p" variant="body1">
          Be sure you type the exact name, because the search functionality is
          not case-sensitive. There are still so many features that can be
          included in this project.
        </Typography>

        <Typography className={classes.text} component="p" variant="body1">
          In last search page you can see your last search in the box still
          contains the name you were looking for. Total documents show all the
          documents available in the database, but this value changes according
          to your custom search.
        </Typography>

        <Typography className={classes.text} component="p" variant="body1">
          Check the{' '}
          <Link
            target="_blank"
            rel="noopener"
            href={`https://github.com/ventoji/basf-assest`}
            color="primary"
          >
            github repository
          </Link>{' '}
          for this project, only take care of web-react and api directories
          where the code was adapted to build this UI.
        </Typography>

        <Typography
          className={classes.text}
          component="p"
          variant="body1"
          color="primary"
        >
          Functionalities not included yet: Authentication, search box for two
          tables and make a new search using patent no. It aslo posible to
          improve user interface both Desktop and Mobile. Testing can be
          included for the components.
        </Typography>
      </Paper>
    </div>
  )
}
