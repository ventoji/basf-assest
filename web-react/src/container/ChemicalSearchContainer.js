import { connect } from 'react-redux'
import ChemicalSearchedList from '../components/ChemicalSearchedList'

export const mapStateToProps = (state) => ({
  chemicalSearch: state.chemicalSearch.listChemical,
  chemicalType: state.filter.chemicalType,
  chemicalName: state.filter.chemicalName,
})

const ChemicalSearchContainer = connect(mapStateToProps)(ChemicalSearchedList)

export default ChemicalSearchContainer
