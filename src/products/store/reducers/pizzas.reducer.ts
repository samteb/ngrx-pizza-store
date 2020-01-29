import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

// state
export interface PizzaState {
  entities: {
    [id: number]: Pizza
  };
  loaded: boolean;
  loading: boolean;
}

// initial state
export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

// reducer
export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  let entities = {};
  let pizza: Pizza = null;
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS:
      return {
        ...state,
        loading: true
      };
    case fromPizzas.LOAD_PIZZAS_SUCCESS:
      entities = action.payload.reduce(
        (pizzas: { [id: number]: Pizza }, pizza: Pizza) => ({ ...pizzas, [pizza.id]: pizza }),
        { ...state.entities }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    case fromPizzas.LOAD_PIZZAS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
    case fromPizzas.CREATE_PIZZA_SUCCESS:
    case fromPizzas.UPDATE_PIZZA_SUCCESS:
      pizza = action.payload;
      entities = {
        ...state.entities,
        [pizza.id]: pizza
      };
      return {
        ...state,
        entities
      };
    case fromPizzas.DELETE_PIZZA_SUCCESS:
      pizza = action.payload;
      const { [pizza.id]: removed, ...newEntities } = state.entities;
      return {
        ...state,
        entities: newEntities
      };
  }

  return state;
}
