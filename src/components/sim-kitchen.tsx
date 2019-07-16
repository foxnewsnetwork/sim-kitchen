import React, { useState, useEffect } from 'react';
import { useSimClock } from './sim-clock';
// import client from '../data/client'
// import { ApolloProvider } from 'react-apollo';


const SimKitchen: React.FC = () => {
  const time = useSimClock()

  return (
    <Subscription subscription={ORDER_SUBSCRIPTION}>
      {
        data => (orderToPlate(data.order))
      }
    </Subscription>
  )
}
  

export default SimKitchen;