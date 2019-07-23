import React from 'react';
import { Provider } from 'react-redux'
import { store } from '../data/store'
import ShelfContainer from './shelf-collection-container';

const SimKitchen: React.FC = () => {
  return (
    <Provider store={store}>
      <ShelfContainer />
    </Provider>
  )
}


export default SimKitchen;