import { connect } from 'react-redux'
import { setFilterChemicalSearch } from '../reducer/actions'
import { bindActionCreators } from 'redux'
import FilterInitial from '../components/FilterInitial'

/* export const mapStateToProps = state => ({
  state: state.filters
});
 */
export const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ setFilterChemicalSearch }, dispatch)

const FilterContainer = connect(undefined, mapDispatchToProps)(FilterInitial)

export default FilterContainer
