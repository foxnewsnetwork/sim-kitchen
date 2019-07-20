import { FoodPlate } from './food-plate'
import { Delivery } from './delivery'
import { uuid } from '../utils/id';

export type DeliverableDish = {
  id: string,
  foodPlateId: FoodPlate["id"],
  deliveryId: Delivery["id"]
}

export function create(plate: FoodPlate, delivery: Delivery): DeliverableDish {
  return {
    id: uuid(),
    foodPlateId: plate.id,
    deliveryId: delivery.id
  }
}