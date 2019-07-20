import { combineReducers } from 'redux'
import { ShelfName, Shelf } from './shelf'
import { Table, create } from '../utils/table'
import { OrderItem } from './order-item'
import { FoodPlate } from './food-plate'
import { DeliverableDish } from './deliverable-dish'
import { Delivery } from './delivery'
import { ActionName, Action } from './action';

type State = {
  shelves: {
    [key in ShelfName]: Shelf
  },
  orderItems: Table<OrderItem>,
  foodPlates: Table<FoodPlate>,
  deliverableDishes: Table<DeliverableDish>,
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
  deliverableDishes: create(),
  deliveries: create()
}

const handlers = {
  [ActionName.TAKE_DOWN_ORDER](state: State, action: Action<ActionName.TAKE_DOWN_ORDER>): State {
    
  }
}