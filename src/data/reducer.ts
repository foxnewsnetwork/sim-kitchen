import over from 'ramda/es/over';
import lensPath from 'ramda/es/lensPath';
import defaultTo from 'ramda/es/defaultTo';
import { ActionName, ActionHash, CreateMetaAction, DestroyMetaAction } from './action';
import { Reducer, Action } from 'redux';
import { State, DEFAULT_STATE, TableName } from './state';
import { ensureMembership, ensureExclusion } from '../utils/table'

type ReducerHash = {
  [ActionName.CREATE_SHELF]: Reducer<State, ActionHash[ActionName.CREATE_SHELF]>,
  [ActionName.CREATE_ORDER_ITEM]: Reducer<State, ActionHash[ActionName.CREATE_ORDER_ITEM]>,
  [ActionName.CREATE_FOOD_PLATE]: Reducer<State, ActionHash[ActionName.CREATE_FOOD_PLATE]>,
  [ActionName.CREATE_DELIVERABLE_DISH]: Reducer<State, ActionHash[ActionName.CREATE_DELIVERABLE_DISH]>,
  [ActionName.CREATE_DELIVERY_REQUEST]: Reducer<State, ActionHash[ActionName.CREATE_DELIVERY_REQUEST]>,
  [ActionName.CREATE_DELIVERY_RECEIPT]: Reducer<State, ActionHash[ActionName.CREATE_DELIVERY_RECEIPT]>,
  [ActionName.CREATE_EXPIRE_TAG]: Reducer<State, ActionHash[ActionName.CREATE_EXPIRE_TAG]>,
  [ActionName.DESTROY_SHELF]: Reducer<State, ActionHash[ActionName.DESTROY_SHELF]>,
  [ActionName.DESTROY_ORDER_ITEM]: Reducer<State, ActionHash[ActionName.DESTROY_ORDER_ITEM]>,
  [ActionName.DESTROY_FOOD_PLATE]: Reducer<State, ActionHash[ActionName.DESTROY_FOOD_PLATE]>,
  [ActionName.DESTROY_DELIVERABLE_DISH]: Reducer<State, ActionHash[ActionName.DESTROY_DELIVERABLE_DISH]>,
  [ActionName.DESTROY_DELIVERY_REQUEST]: Reducer<State, ActionHash[ActionName.DESTROY_DELIVERY_REQUEST]>,
  [ActionName.DESTROY_DELIVERY_RECEIPT]: Reducer<State, ActionHash[ActionName.DESTROY_DELIVERY_RECEIPT]>,
  [ActionName.DESTROY_EXPIRE_TAG]: Reducer<State, ActionHash[ActionName.DESTROY_EXPIRE_TAG]>,
}

const ensureExistMetaReducer = (tableName: TableName) => (state = DEFAULT_STATE, action: CreateMetaAction<TableName>) => {
  const tableLens = lensPath([tableName])
  return over(tableLens, ensureMembership(action.payload), state)
}

const denyExistMetaReducer = (tableName: TableName) => (state = DEFAULT_STATE, action: DestroyMetaAction<TableName>) => {
  const tableLens = lensPath([tableName])
  return over(tableLens, ensureExclusion(action.id), state)
}

const reducerHash: ReducerHash = {
  [ActionName.CREATE_SHELF]: ensureExistMetaReducer(TableName.shelves),
  [ActionName.CREATE_ORDER_ITEM]: ensureExistMetaReducer(TableName.orderItems),
  [ActionName.CREATE_FOOD_PLATE]: ensureExistMetaReducer(TableName.foodPlates),
  [ActionName.CREATE_DELIVERABLE_DISH]: ensureExistMetaReducer(TableName.deliverableDishes),
  [ActionName.CREATE_DELIVERY_REQUEST]: ensureExistMetaReducer(TableName.deliveryRequests),
  [ActionName.CREATE_DELIVERY_RECEIPT]: ensureExistMetaReducer(TableName.deliveryReceipts),
  [ActionName.CREATE_EXPIRE_TAG]: ensureExistMetaReducer(TableName.expireTags),
  [ActionName.DESTROY_SHELF]: denyExistMetaReducer(TableName.shelves),
  [ActionName.DESTROY_ORDER_ITEM]: denyExistMetaReducer(TableName.orderItems),
  [ActionName.DESTROY_FOOD_PLATE]: denyExistMetaReducer(TableName.foodPlates),
  [ActionName.DESTROY_DELIVERABLE_DISH]: denyExistMetaReducer(TableName.deliverableDishes),
  [ActionName.DESTROY_DELIVERY_REQUEST]: denyExistMetaReducer(TableName.deliveryRequests),
  [ActionName.DESTROY_DELIVERY_RECEIPT]: denyExistMetaReducer(TableName.deliveryReceipts),
  [ActionName.DESTROY_EXPIRE_TAG]: denyExistMetaReducer(TableName.expireTags),
}

const missingHandler = (state: any, action: { type: any }) => {
  console.warn('missing handler for event of type', action.type)
  return state;
}

export function reducer(state: State = DEFAULT_STATE, action: Action<ActionName>): State {
  const handler = defaultTo(missingHandler, reducerHash[action.type])
  return handler(state, action)
}