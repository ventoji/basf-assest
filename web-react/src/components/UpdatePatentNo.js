import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FindPatentNoContainer from '../container/FindPatentNoContainer'
import _ from 'lodash'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
  navLink: {
    textDecoration: 'none',
  },
  noVisible: {
    display: 'none'
  },
  visible: {
    display: 'block'
  }
})


export default function DocumentCountAll({
  chemicalName,
  chemicalSearch
}) {
  const classes = useStyles()

  // const [filterState, setFilterState] = useState({ chemicalFilter: '' })
  const [fecthResult, setfetchResult] = useState('')
  const [sizeListChemical, setSizeListChemical]= useState()

  useEffect(() => {
    /** Rerender component whenever a filter text changes
     *  and show count and link for display in other page
     */
    setfetchResult(chemicalName)
    setSizeListChemical(_.size(chemicalSearch.listChemical))
  
    //  setFilterState({ chemicalFilter: chemicalName })
  }, [chemicalName])

 // if (!loading) return setChemicalType(chemicalSearch.typeChemical)
  return (
    <React.Fragment>
    {/*console.log('updatePatent',chemicalSearch)*/}
    
    {_.size(chemicalName)>0 && _.map(chemicalSearch.listChemical,(item, index) => {
        return <div key={`${index}${item.patentno}`} className={index===sizeListChemical-1? classes.visible :classes.noVisible}>
        <FindPatentNoContainer patentno ={item.patentno}/>
       
        </div>
    }) }
    
    </React.Fragment>
  )
}
