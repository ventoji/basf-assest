import { connect } from 'react-redux'
import { setCurrentChemicalSearch, setChemicalType } from '../reducer/actions'
import { bindActionCreators } from 'redux'
import UpdatePatentNo from '../components/UpdatePatentNo'
import { filteredChemical } from '../reducer/selectors'

export const mapStateToProps = (state) => ({
  chemicalName: state.filter.chemicalName,
  chemicalSearch: filteredChemical(state.chemicalSearch.listChemical, state.filter),
})

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setCurrentChemicalSearch, setChemicalType }, dispatch)

const UpdatePatentNoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdatePatentNo)

export default UpdatePatentNoContainer