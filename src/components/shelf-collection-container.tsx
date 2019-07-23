import { connect } from 'react-redux'
import { selectShelves } from '../data/selector'
import { State } from '../data/state';
import ShelfCollection from './shelf-collection'

// TODO: see guide docs at https://redux.js.org/basics/usage-with-react

const mapStateToProps = (state: State) => {
  return {
    shelves: selectShelves(state)
  }
}

export default connect(mapStateToProps)(ShelfCollection)