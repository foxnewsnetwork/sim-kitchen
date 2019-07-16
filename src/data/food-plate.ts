import { uuid } from '../utils/id';
import { OrderItem } from './order-item'

export type FoodPlate = {
  id: string,
  orderId: OrderItem["id"]
}

export function create(order: OrderItem): FoodPlate {
  return {
    id: uuid(),
    orderId: order.id
  }
}