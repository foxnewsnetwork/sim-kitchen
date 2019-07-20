import { DeliverableDish } from './deliverable-dish'

export const enum ShelfName {
  HOT,
  COLD,
  FROZEN,
  OVERFLOW
}

export type Shelf = {
  name: ShelfName,
  items: Array<DeliverableDish>
}