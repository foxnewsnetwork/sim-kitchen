import { OrderItem } from './order-item'
import { FoodPlate, create } from './food-plate'

/**
 * Takes an order and returns a promise to the food
 * For the purposes of the initial product description,
 * we can have the promsie resolve instantly, however
 * based upon real life research, it's highly unlikely
 * that food is made instantly by any kitchen.
 * 
 * It thus makes sense for us to accommodate this by return
 * a promise that insta-resolves rather than the underlying
 * object itself
 * @param order 
 */
export function placeOrder(order: OrderItem): Promise<FoodPlate> {
  return Promise.resolve(create(order))
}