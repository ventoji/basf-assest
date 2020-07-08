import { connect } from 'react-redux'
import ChemicalSearchedList from '../components/ChemicalSearchedList'

export const mapStateToProps = (state) => ({
  chemicalSearch: state.chemicalSearch.Chemcial1,
  chemicalName: state.filter.chemicalName,
})

const ChemicalSearchContainer = connect(mapStateToProps)(ChemicalSearchedList)

export default ChemicalSearchContainer
