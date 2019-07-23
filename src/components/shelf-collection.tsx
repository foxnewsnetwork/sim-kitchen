import React, { Props } from 'react';
import { ShelfName, DeliverableDish } from '../data/state';

type ShelfCollectionProps = Array<{
  shelfName: ShelfName,
  dishes: Array<DeliverableDish>
}>
const ShelfCollection: React.FC = (shelves: Props<ShelfCollectionProps>) => {
  // TODO
}

export default ShelfCollection