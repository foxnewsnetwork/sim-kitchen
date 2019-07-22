import { State, TableName } from './state';
import { TableElementType } from '../utils/table'

export const enum ActionName {
  CREATE_SHELF = 'CREATE_SHELF',
  CREATE_ORDER_ITEM = 'CREATE_ORDER_ITEM',
  CREATE_FOOD_PLATE = 'CREATE_FOOD_PLATE',
  CREATE_DELIVERABLE_DISH = 'CREATE_DELIVERABLE_DISH',
  CREATE_DELIVERY_REQUEST = 'CREATE_DELIVERY_REQUEST',
  CREATE_DELIVERY_RECEIPT = 'CREATE_DELIVERY_RECEIPT',
  CREATE_EXPIRE_TAG = 'CREATE_EXPIRE_TAG',
  DESTROY_SHELF = 'DESTROY_SHELF',
  DESTROY_ORDER_ITEM = 'DESTROY_ORDER_ITEM',
  DESTROY_FOOD_PLATE = 'DESTROY_FOOD_PLATE',
  DESTROY_DELIVERABLE_DISH = 'DESTROY_DELIVERABLE_DISH',
  DESTROY_DELIVERY_REQUEST = 'DESTROY_DELIVERY_REQUEST',
  DESTROY_DELIVERY_RECEIPT = 'DESTROY_DELIVERY_RECEIPT',
  DESTROY_EXPIRE_TAG = 'DESTROY_EXPIRE_TAG',
}

export type ActionHash = {
  [ActionName.CREATE_SHELF]: CreateMetaAction<TableName.shelves>,
  [ActionName.CREATE_ORDER_ITEM]: CreateMetaAction<TableName.orderItems>,
  [ActionName.CREATE_FOOD_PLATE]: CreateMetaAction<TableName.foodPlates>,
  [ActionName.CREATE_DELIVERABLE_DISH]: CreateMetaAction<TableName.deliverableDishes>,
  [ActionName.CREATE_DELIVERY_REQUEST]: CreateMetaAction<TableName.deliveryRequests>,
  [ActionName.CREATE_DELIVERY_RECEIPT]: CreateMetaAction<TableName.deliveryReceipts>,
  [ActionName.CREATE_EXPIRE_TAG]: CreateMetaAction<TableName.expireTags>,
  [ActionName.DESTROY_SHELF]: DestroyMetaAction<TableName.shelves>,
  [ActionName.DESTROY_ORDER_ITEM]: DestroyMetaAction<TableName.orderItems>,
  [ActionName.DESTROY_FOOD_PLATE]: DestroyMetaAction<TableName.foodPlates>,
  [ActionName.DESTROY_DELIVERABLE_DISH]: DestroyMetaAction<TableName.deliverableDishes>,
  [ActionName.DESTROY_DELIVERY_REQUEST]: DestroyMetaAction<TableName.deliveryRequests>,
  [ActionName.DESTROY_DELIVERY_RECEIPT]: DestroyMetaAction<TableName.deliveryReceipts>,
  [ActionName.DESTROY_EXPIRE_TAG]: DestroyMetaAction<TableName.expireTags>,
}

const TableHash = {
  [TableName.shelves]: {
    create: ActionName.CREATE_SHELF,
    destroy: ActionName.CREATE_SHELF
  },
  [TableName.orderItems]: {
    create: ActionName.CREATE_ORDER_ITEM,
    destroy: ActionName.CREATE_ORDER_ITEM
  },
  [TableName.foodPlates]: {
    create: ActionName.CREATE_FOOD_PLATE,
    destroy: ActionName.CREATE_FOOD_PLATE
  },
  [TableName.deliverableDishes]: {
    create: ActionName.CREATE_DELIVERABLE_DISH,
    destroy: ActionName.CREATE_DELIVERABLE_DISH
  },
  [TableName.deliveryRequests]: {
    create: ActionName.CREATE_DELIVERY_REQUEST,
    destroy: ActionName.CREATE_DELIVERY_REQUEST
  },
  [TableName.deliveryReceipts]: {
    create: ActionName.CREATE_DELIVERY_RECEIPT,
    destroy: ActionName.CREATE_DELIVERY_RECEIPT
  },
  [TableName.expireTags]: {
    create: ActionName.CREATE_EXPIRE_TAG,
    destroy: ActionName.CREATE_EXPIRE_TAG
  }
}

export type CreateMetaAction<T extends TableName> = {
  readonly type: ActionName,
  readonly payload: TableElementType<State[T]>
}

function createMetaAction<T extends TableName>(tableName: T) {
  return (payload: TableElementType<State[T]>) => ({
    type: TableHash[tableName].create,
    payload
  })
}

export type DestroyMetaAction<T extends TableName> = {
  readonly type: ActionName,
  readonly id: TableElementType<State[T]>["id"]
}

function destroyMetaAction<T extends TableName>(tableName: T) {
  return (id: TableElementType<State[T]>["id"]) => ({
    type: TableHash[tableName].destroy,
    id
  })
}

export type CreateShelfAction = CreateMetaAction<TableName.shelves>
export const createShelfAction = createMetaAction(TableName.shelves)
export type CreateOrderItemAction = CreateMetaAction<TableName.orderItems>
export const createOrderItemAction = createMetaAction(TableName.orderItems)
export type CreateFoodPlateAction = CreateMetaAction<TableName.foodPlates>
export const createFoodPlateAction = createMetaAction(TableName.foodPlates)
export type CreateDeliverableDishAction = CreateMetaAction<TableName.deliverableDishes>
export const createDeliverableDishAction = createMetaAction(TableName.deliverableDishes)
export type CreateDeliveryRequestAction = CreateMetaAction<TableName.deliveryRequests>
export const createDeliveryRequestAction = createMetaAction(TableName.deliveryRequests)
export type CreateDeliveryReceiptAction = CreateMetaAction<TableName.deliveryReceipts>
export const createDeliveryReceiptAction = createMetaAction(TableName.deliveryReceipts)
export type CreateExpireTagAction = CreateMetaAction<TableName.expireTags>
export const createExpireTagAction = createMetaAction(TableName.expireTags)
export type DestroyShelfAction = DestroyMetaAction<TableName.shelves>
export const destroyShelfAction = destroyMetaAction(TableName.shelves)
export type DestroyOrderItemAction = DestroyMetaAction<TableName.orderItems>
export const destroyOrderItemAction = destroyMetaAction(TableName.orderItems)
export type DestroyFoodPlateAction = DestroyMetaAction<TableName.foodPlates>
export const destroyFoodPlateAction = destroyMetaAction(TableName.foodPlates)
export type DestroyDeliverableDishAction = DestroyMetaAction<TableName.deliverableDishes>
export const destroyDeliverableDishAction = destroyMetaAction(TableName.deliverableDishes)
export type DestroyDeliveryRequestAction = DestroyMetaAction<TableName.deliveryRequests>
export const destroyDeliveryRequestAction = destroyMetaAction(TableName.deliveryRequests)
export type DestroyDeliveryReceiptAction = DestroyMetaAction<TableName.deliveryReceipts>
export const destroyDeliveryReceiptAction = destroyMetaAction(TableName.deliveryReceipts)
export type DestroyExpireTagAction = DestroyMetaAction<TableName.expireTags>
export const destroyExpireTagAction = destroyMetaAction(TableName.expireTags)