import { TableName, OrderItem, EntryCreator, ShelfName } from "./state";
import { put, takeEvery, select } from 'redux-saga/effects'
import { ActionName, CreateFoodPlateAction, CreateOrderItemAction, createFoodPlateAction, createDeliverableDishAction, createDeliveryRequestAction } from "./action";

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
export function* saga() {
  yield takeEvery(ActionName.CREATE_ORDER_ITEM, cookPlateFromOrder)
}

/**
 * Upon receiving an order, the kitchen immediately prepares
 * the plate. We write this a saga because we expect that
 * no kitchen can feasibly cook things instaneously, so we
 * use the mechanism of asynchrony to handle this
 * 
 * @param action 
 */
function* cookPlateFromOrder(action: CreateOrderItemAction) {
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

  const shelfLabel = EntryCreator[TableName.shelfLabels]({
    shelf: order.temp
  })
}

/**
 * When a plate of food is ready, we next want to slot it
 * for delivery. This involves:
 * 
 * 1. scheduling a delivery
 * 2. creating a deliverable dish
 * 3. putting this dish into a shelf
 * 
 * @param action 
 */
function* prepareFoodForDelivery(action: CreateFoodPlateAction) {
  const plate = action.payload
  
}