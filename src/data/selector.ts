import { State, DeliverableDish, TableName, FoodPlate } from './state';
import { createSelector } from 'reselect'
import { findById } from '../utils/table'

const selectFoodPlateFromDeliverableDish = (state: State, dish: Pick<DeliverableDish, "id">) => {
  const findDish = findById<DeliverableDish>(dish.id)
  // TODO: complete
}

const selectOrderItemFromDeliverableDish = createSelector(
  selectFoodPlateFromDeliverableDish,
  (foodPlate: FoodPlate) => foodPlate.order
)
const selectShelfLifeFromDeliverableDish = (state: State, dish: Pick<DeliverableDish, "id">) => {
  const orderItem = selectOrderItemFromDeliverableDish(state, dish)
}
const selectOrderAgeFromDeliverableDish = () => { /* TODO */ }
const selectDecayRateFromDeliverableDish = () => { /* TODO */ }
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

export const selectAvailableShelfForOrderItem = () => { /** TODO */ }

export const selectShelves = () => { /** TODO */ }