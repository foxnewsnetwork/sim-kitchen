import { ShelfName, Shelf } from './shelf'
import { Table, create } from '../utils/table'
import { OrderItem } from './order-item'
import { FoodPlate } from './food-plate'
import { DeliverablePlate } from './deliverable-plate'
import { Delivery } from './delivery'

type State = {
  shelves: {
    [key in ShelfName]: Shelf
  },
  orderItems: Table<OrderItem>,
  foodPlates: Table<FoodPlate>,
  deliverablePlates: Table<DeliverablePlate>,
  deliveries: Table<Delivery>
}

const DEFAULT_STATE: State = {
  shelves: {
    [ShelfName.HOT]: {
      name: ShelfName.HOT,
      items: []
    },
    [ShelfName.COLD]: {
      name: ShelfName.COLD,
      items: []
    },
    [ShelfName.FROZEN]: {
      name: ShelfName.FROZEN,
      items: []
    },
    [ShelfName.OVERFLOW]: {
      name: ShelfName.OVERFLOW,
      items: []
    }
  },
  orderItems: create(),
  foodPlates: create(),
  deliverablePlates: create(),
  deliveries: create()
}
