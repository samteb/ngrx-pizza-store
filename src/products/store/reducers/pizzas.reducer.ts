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
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS:
      return {
        ...state,
        loading: true
      };
    case fromPizzas.LOAD_PIZZAS_SUCCESS:
      const entities = action.payload.reduce(
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
  }

  return state;
}

// getters
export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;

