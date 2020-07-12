import { connect } from 'react-redux'
import { 
    setCurrentChemicalSearch, 
    setCurrentChemicalPatent  
} from '../reducer/actions'
import { bindActionCreators } from 'redux'
// import DocumentCount from '../components/DocumentCount'
import FindPatentNo from '../components/FindPatentNo'
import { filteredPatent } from '../reducer/selectors'

export const mapStateToProps = (state) => ({
  chemicalName: state.filter.chemicalName,
  chemicalPatentNo: filteredPatent(state.filter.chemicalPatents),
})

export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ 
      setCurrentChemicalPatent, 
      setCurrentChemicalSearch, 
    }, dispatch)

const FindPatentNoContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(FindPatentNo)

export default FindPatentNoContainer