import { DeliverableDish } from './deliverable-dish'

export const enum ShelfName {
  HOT,
  COLD,
  FROZEN,
  OVERFLOW
}

export type Shelf = {
  id: string,
  name: ShelfName,
  dishIds: Array<DeliverableDish["id"]>
}