import { Topping } from './topping.model';

export interface Pizza {
  id?: number;
  name?: string;
  toppings?: Topping[];
}
