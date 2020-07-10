import { connect } from 'react-redux'
import { setCurrentChemicalSearch, setChemicalType } from '../reducer/actions'
import { bindActionCreators } from 'redux'
// import DocumentCount from '../components/DocumentCount'
import DocumentCountAll from '../components/DocumentCountAll'
import { filteredChemical } from '../reducer/selectors'

export const mapStateToProps = (state) => ({
  chemicalName: state.filter.chemicalName,
 //chemicalSearch: state.chemicalSearch.listChemical,
  chemicalSearch: filteredChemical(state.chemicalSearch.listChemical, state.filter),
})

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setCurrentChemicalSearch, setChemicalType }, dispatch)

const DocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentCountAll)

export default DocumentContainer
