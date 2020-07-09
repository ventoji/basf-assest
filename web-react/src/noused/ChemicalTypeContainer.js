import { connect } from 'react-redux'
import ChemicalTypeRef from '../components/ChemicalTypeRef'

export const mapStateToProps = (state) => ({
  chemicalSearch: state.chemicalSearch.listChemical,
  chemicalName: state.filter.chemicalName,
})

const ChemicalTypeContainer = connect(mapStateToProps)(ChemicalTypeRef)

export default ChemicalTypeContainer
