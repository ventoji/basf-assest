import { connect } from 'react-redux'
import { setCurrentChemicalSearch } from '../reducer/actions'
import { bindActionCreators } from 'redux'
import DocumentCount from '../components/DocumentCount'

export const mapStateToProps = (state) => ({
  chemicalName: state.filter.chemicalName,
})

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setCurrentChemicalSearch }, dispatch)

const DocumentContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DocumentCount)

export default DocumentContainer
