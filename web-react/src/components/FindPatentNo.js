import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Title from './Title'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { Grid, Paper } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import clsx from 'clsx'
// import ChemicalTypeRecf from './ChemicalTypeRecf'
import ChemicalPatents from './ChemicalPatents'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
  },
  paper: {
    
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 480,
  },
})


const GET_PATENTNO_SEARCH = gql`
query($patentno: String!){
    Chemical2(patentno: $patentno){
      chemicaltype2
    }
    Chemical1(patentno: $patentno){
      chemicaltype1
    }
  }
`
export default function FindAllPatentNo({
  chemicalName,
  setCurrentChemicalPatent,
  chemicalPatentNo,
  patentno
}) {
   
  ///const classes = useStyles()
  const theme = useTheme()
  const classes = useStyles(theme)
 const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight)
 

  // const [chemicalPatentData, setChemicalPatentData] = useState({})
   const [patentNo, setPatentNo] = useState(patentno)
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

  const { loading, data, error } = useQuery(GET_PATENTNO_SEARCH , {
    variables: {
      patentno: patentNo,
      first: rowsPerPage,
      offset: rowsPerPage * page,
      orderBy: orderBy + '_' + order,
    },
    onCompleted: setCurrentChemicalPatent,
  })

  useEffect(() => {
    /** Rerender component whenever a filter text changes
     *  and show count and link for display in other page
     */
    setfetchResult(chemicalName)
   // setPatentNo(patentno) //"US5342626")
  //  setChemicalType(chemicalSearch.typeChemical)

    //  setFilterState({ chemicalFilter: chemicalName })
  }, [chemicalName])

  if (error) return <p>Error</p>
 // if (!loading) return setChemicalType(chemicalSearch.typeChemical)
  return (
    <React.Fragment>
      <Title> Other chemical types with the same patent </Title>
      <Typography component="p" variant="h4">
        {loading
          ? 'Loading...'
          : chemicalName}
      </Typography>
      <Grid container spacing={4}>
           {/* Chemical Type 1 */}
           <Grid item xs={12} md={6} lg={6}>
           <Paper className={fixedHeightPaper}>
           <ChemicalPatents patentSearch={chemicalPatentNo.chemical1} />
            {/*_.map(chemicalPatentNo.chemical1, (item,index) => {
                return <p key={index}> {item.name}:{item.count}</p>
            })*/}
           </Paper>
         </Grid>
         {/* Chemical type 2 */}
         <Grid item xs={12} md={6} lg={6}>
           <Paper className={fixedHeightPaper}>
           <ChemicalPatents patentSearch={chemicalPatentNo.chemical2} />
           {/*_.map(chemicalPatentNo.chemical2, (item,index) => {
            return <p key={index}> {item.name}: {item.count}</p>
        })*/} 
           </Paper>
         </Grid>
        </Grid>
    </React.Fragment>
  )
}
