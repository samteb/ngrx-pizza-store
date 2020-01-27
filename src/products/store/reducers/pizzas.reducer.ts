import * as fromPizzas from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

// state
export interface PizzaState {
  data: Pizza[];
  loaded: boolean;
  loading: boolean;
}

// initial state
export const initialState: PizzaState = {
  data: [],
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
      const data = action.payload;
      return {
        ...state,
        loading: false,
        loaded: true,
        data
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
export const getPizzas = (state: PizzaState) => state.data;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;

