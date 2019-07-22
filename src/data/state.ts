import { Table, create, TableElementType, BelongsTo, HasMany, hasMany, belongsTo } from '../utils/table'
import { uuid } from "../utils/id";
import { range } from '../utils/iter';
import { iterableMember } from '../utils/random';

export const enum Temperature {
  HOT,
  COLD,
  FROZEN
}

export const enum ShelfName {
  HOT,
  COLD,
  FROZEN,
  OVERFLOW
}

export type ShelfLabel = {
  id: string,
  shelf: ShelfName,
  deliverableDish: BelongsTo<DeliverableDish>
}
export type DeliveryRequest = {
  id: string,
  timeToArrival: number,
  deliverableDish: BelongsTo<DeliverableDish>
}
export type DeliveryReceipt = {
  id: string,
  deliveryRequest: BelongsTo<DeliveryRequest>
}
export type ExpireTag = {
  id: string,
  deliverableDish: BelongsTo<DeliverableDish>
}

export type OrderItem = {
  id: string,
  name: string,
  temp: Temperature,
  shelfLife: number,
  decayRate: number
}

export type FoodPlate = {
  id: string,
  order: BelongsTo<OrderItem>
}

export type DeliverableDish = {
  id: string,
  foodPlate: BelongsTo<FoodPlate>
}

export const enum TableName {
  shelfLabels = 'shelfLabels',
  orderItems = 'orderItems',
  foodPlates = 'foodPlates',
  deliverableDishes = 'deliverableDishes',
  deliveryRequests = 'deliveryRequests',
  deliveryReceipts = 'deliveryReceipts',
  expireTags = 'expireTags',
}

export type State = {
  [TableName.shelfLabels]: Table<ShelfLabel>,
  [TableName.orderItems]: Table<OrderItem>,
  [TableName.foodPlates]: Table<FoodPlate>,
  [TableName.deliverableDishes]: Table<DeliverableDish>,
  [TableName.deliveryRequests]: Table<DeliveryRequest>,
  [TableName.deliveryReceipts]: Table<DeliveryReceipt>,
  [TableName.expireTags]: Table<ExpireTag>
}

type CreateArgs = {
  [TableName.shelfLabels]: {
    shelfLabel: Pick<ShelfLabel, "shelf">,
    deliverableDish: Pick<DeliverableDish, "id">
  },
  [TableName.orderItems]: Exclude<OrderItem, "id">,
  [TableName.foodPlates]: Pick<OrderItem, "id">,
  [TableName.deliverableDishes]: Pick<FoodPlate, "id">,
  [TableName.deliveryRequests]: Pick<DeliverableDish, "id">,
  [TableName.deliveryReceipts]: Pick<DeliveryRequest, "id">,
  [TableName.expireTags]: Pick<DeliverableDish, "id">
}

type CreateHash = {
  [tableName in keyof State]: (payload: CreateArgs[tableName]) => TableElementType<State[tableName]>
}

export const EntryCreator: CreateHash = {
  [TableName.shelfLabels]({ shelfLabel, deliverableDish }) {
    return {
      ...shelfLabel,
      deliverableDish,
      id: uuid(),
    }
  },
  [TableName.orderItems](order) {
    return {
      ...order,
      id: uuid()
    }
  },
  [TableName.deliveryRequests]({ id }) {
    return {
      deliverableDish: belongsTo(id),
      id: uuid(),
      timeToArrival: iterableMember(range(2, 10))
    }
  },
  [TableName.foodPlates](order) {
    return {
      id: uuid(),
      order: belongsTo(order.id)
    }
  },
  [TableName.deliverableDishes]({ id }) {
    return {
      id: uuid(),
      foodPlate: belongsTo(id)
    }
  },
  [TableName.deliveryReceipts]({ id }) {
    return {
      id: uuid(),
      deliveryRequest: belongsTo(id)
    }
  },
  [TableName.expireTags]({ id }) {
    return {
      id: uuid(),
      deliverableDish: belongsTo(id)
    }
  }
}

export const DEFAULT_STATE: State = {
  shelfLabels: create(),
  orderItems: create(),
  foodPlates: create(),
  deliverableDishes: create(),
  deliveryRequests: create(),
  expireTags: create(),
  deliveryReceipts: create()
}

