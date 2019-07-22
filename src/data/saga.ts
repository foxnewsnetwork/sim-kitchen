import { TableName, OrderItem, EntryCreator } from "./state";
import { put, takeEvery, select } from 'redux-saga/effects'
import { ActionName, CreateFoodPlateAction, CreateOrderItemAction, createFoodPlateAction } from "./action";

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

function* cookPlateFromOrder(action: CreateOrderItemAction) {
  const order = action.payload
  const foodPlate = EntryCreator[TableName.foodPlates](order)
  const plateAction = createFoodPlateAction(foodPlate)
  yield put(plateAction)
}