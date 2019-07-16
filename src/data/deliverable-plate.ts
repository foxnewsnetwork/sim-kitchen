import { FoodPlate } from './food-plate'
import { Delivery } from './delivery'
import { uuid } from '../utils/id';

export type DeliverablePlate = {
  id: string,
  foodPlateId: FoodPlate["id"],
  deliveryId: Delivery["id"]
}

export function create(plate: FoodPlate, delivery: Delivery): DeliverablePlate {
  return {
    id: uuid(),
    foodPlateId: plate.id,
    deliveryId: delivery.id
  }
}