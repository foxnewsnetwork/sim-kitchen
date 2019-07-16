import ApolloClient from 'apollo-boost';

const enum ShelfName {
  HOT,
  COLD,
  FROZEN,
  OVERFLOW
}

const enum Temperature {
  HOT,
  COLD,
  FROZEN
}

type OrderItem = {
  id: string,
  name: string,
  temp: Temperature,
  shelfLife: number,
  decayRate: number
}
type FoodPlate = {
  id: string,
  orderId: OrderItem["id"]
}
type DeliverablePlate = {
  id: string,
  foodPlateId: FoodPlate["id"],
  deliverId: Delivery["id"]
}
type Delivery = {
  id: string,
  timeToArrival: number
}
type Table<T extends { id: string }> = Map<T["id"], T>

type State = {
  shelves: {
    [key in ShelfName]: Array<DeliverablePlate>
  },
  orderItems: Table<OrderItem>,
  foodPlates: Table<FoodPlate>,
  deliverablePlates: Table<DeliverablePlate>,
  deliveries: Table<Delivery>
}

const DEFAULT_STATE: State = {
  shelves: {
    [ShelfName.HOT]: [],
    [ShelfName.COLD]: [],
    [ShelfName.FROZEN]: [],
    [ShelfName.OVERFLOW]: []
  },
  orderItems: new Map(),
  foodPlates: new Map(),
  deliverablePlates: new Map(),
  deliveries: new Map()
}

export default new ApolloClient({
  clientState: {
    defaults: DEFAULT_STATE
  },
  resolvers: {
    Subscription: {

    }
  }
})