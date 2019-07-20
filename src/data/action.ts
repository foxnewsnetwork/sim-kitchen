import { OrderItem } from "./order-item";
import { FoodPlate } from "./food-plate";
import { DeliverableDish } from "./deliverable-dish";
import { Delivery } from "./delivery";
import { DeliveryReceipt } from "./delivery-receipt";

export const enum ActionName {
  TAKE_DOWN_ORDER,
  COOK_FOOD_FROM_ORDER,
  ASSEMBLE_DISH_FROM_FOOD,
  READY_DISH_FOR_DELIVERY,
  DELIVER_DISH,
  EXPIRE_DISH
}

export type Action<N extends ActionName> = {
  payload: ActionPayload[N],
  type: N
}

export type ActionPayload = {
  [ActionName.TAKE_DOWN_ORDER]: OrderItem,
  [ActionName.COOK_FOOD_FROM_ORDER]: OrderItem["id"],
  [ActionName.ASSEMBLE_DISH_FROM_FOOD]: FoodPlate["id"],
  [ActionName.READY_DISH_FOR_DELIVERY]: DeliverableDish["id"],
  [ActionName.DELIVER_DISH]: Delivery["id"],
  [ActionName.EXPIRE_DISH]: Delivery["id"]
}