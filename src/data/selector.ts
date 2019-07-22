import { State, DeliverableDish, TableName } from './state';
import { createSelector } from 'reselect'
import { findById } from '../utils/table'

const selectFoodPlateFromDeliverableDish = (state: State, dish: Pick<DeliverableDish, "id">) => {
  const findDish = findById<DeliverableDish>(dish.id)
  const { foodPlate } = findDish(state[TableName.deliverableDishes])
}

// const selectOrderItemFromDeliverableDish = createSelector(
//   selectFoodPlateFromDeliverableDish,
// )
const selectShelfLifeFromDeliverableDish = (state: State, dish: Pick<DeliverableDish, "id">) => {
  const orderItem = selectOrderItemFromDeliverableDish(state, dish)
}
// selectOrderAgeFromDeliverableDish
// selectDecayRateFromDeliverableDish
/**
 * This formula is given to us by the spec docs
 */
const selectValueFromDeliverableDish = createSelector(
  [
    selectShelfLifeFromDeliverableDish, 
    selectOrderAgeFromDeliverableDish,
    selectDecayRateFromDeliverableDish
  ],
  (shelfLife, orderAge, decayRate) => (shelfLife - orderAge) - (decayRate * orderAge)
)