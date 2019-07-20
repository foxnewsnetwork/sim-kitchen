import { Delivery } from "./delivery";

export type DeliveryReceipt = {
  id: string,
  deliveryId: Delivery["id"]
}