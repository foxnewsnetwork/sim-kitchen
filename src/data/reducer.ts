import { Shelf } from './shelf'
import { Table, create, TableElementType, ensureMembership, ensureExclusion } from '../utils/table'
import { OrderItem } from './order-item'
import { FoodPlate } from './food-plate'
import { DeliverableDish } from './deliverable-dish'
import { Delivery } from './delivery'
import over from 'ramda/es/over';
import lensPath from 'ramda/es/lensPath';

type State = {
  shelves: Table<Shelf>,
  orderItems: Table<OrderItem>,
  foodPlates: Table<FoodPlate>,
  deliverableDishes: Table<DeliverableDish>,
  deliveries: Table<Delivery>
}

type StateField = keyof State

const DEFAULT_STATE: State = {
  shelves: create(),
  orderItems: create(),
  foodPlates: create(),
  deliverableDishes: create(),
  deliveries: create()
}

const enum ActionName {
  ENSURE_EXISTENCE,
  DENY_EXISTENCE
}

type EnsureExistenceAction<F extends StateField> = {
  readonly type: ActionName.ENSURE_EXISTENCE,
  readonly tableName: F,
  readonly payload: TableElementType<State[F]>
}

type DenyExistenceAction<F extends StateField> = {
  readonly type: ActionName.DENY_EXISTENCE,
  readonly tableName: F,
  readonly id: TableElementType<State[F]>["id"]
}

const handlers = {
  [ActionName.ENSURE_EXISTENCE]<F extends StateField>(state: State, action: EnsureExistenceAction<F>): State {
    const tableLens = lensPath([action.tableName])
    return over(tableLens, ensureMembership(action.payload), state)
  },
  [ActionName.DENY_EXISTENCE]<F extends StateField>(state: State, action: DenyExistenceAction<F>): State {
    const tableLens = lensPath([action.tableName])
    return over(tableLens, ensureExclusion(action.id), state)
  }
}

export function reducer(state: State, action: { type: ActionName }): State {
  const handler = handlers[action.type]
  if (typeof handler === 'function') {
    return handler(state, action)
  } else {
    return state
  }
}