import { TableName, OrderItem, EntryCreator, ShelfName } from "./state";
import { put, takeEvery, select } from 'redux-saga/effects'
import { ActionName, CreateFoodPlateAction, CreateOrderItemAction, createFoodPlateAction, createDeliverableDishAction, createDeliveryRequestAction, createShelfLabelAction } from "./action";
import { selectAvailableShelfForOrderItem } from './selector';

/**
 * The root saga represents all the concurrency state transitions 
 * in our app
 */
export function* saga() {
  yield takeEvery(ActionName.CREATE_ORDER_ITEM, kitchenFoodDeliverySaga)
}

/**
 * Given an order, we want to do the following:
 *
 * 1. Record our order
 * 2. Have the kitchen prepare the dish
 * 3. Slot the dish into delivery queue
 * 4. Schedule a delivery for the dish
 * 5. If delivery arrives in time, record with a delivery receipt
 * 6. If food expires before delivery, mark with expiration tag
 *
 */
function* kitchenFoodDeliverySaga(action: CreateOrderItemAction) {
  const order = action.payload
  const foodPlate = EntryCreator[TableName.foodPlates](order)
  const plateAction = createFoodPlateAction(foodPlate)
  yield put(plateAction)

  const dish = EntryCreator[TableName.deliverableDishes](foodPlate)
  const dishAction = createDeliverableDishAction(dish)
  yield put(dishAction)

  const delivery = EntryCreator[TableName.deliveryRequests](dish)
  const deliveryAction = createDeliveryRequestAction(delivery)
  yield put(deliveryAction)

  const shelf: ShelfName = yield select(selectAvailableShelfForOrderItem, order)
  const shelfLabel = EntryCreator[TableName.shelfLabels]({
    shelfLabel: { shelf },
    deliverableDish: dish
  })
  const shelfLabelAction = createShelfLabelAction(shelfLabel)
  yield put(shelfLabelAction)

  // TODO: wait for delivery
  // TODO: handle expiration
}