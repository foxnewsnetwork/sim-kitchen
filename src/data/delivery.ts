import { uuid } from "../utils/id";
import { range } from '../utils/iter';
import { iterableMember } from '../utils/random';

export type Delivery = {
  id: string,
  timeToArrival: number
}

export function create(): Delivery {
  return { id: uuid(), timeToArrival: iterableMember(range(2, 10)) }
}