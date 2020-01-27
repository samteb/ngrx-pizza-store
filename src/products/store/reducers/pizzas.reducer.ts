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
  data: [
    {
      name: 'Blazin\' Inferno',
      toppings: [
        {
          id: 10,
          name: 'pepperoni'
        },
        {
          id: 9,
          name: 'pepper'
        },
        {
          id: 4,
          name: 'chili'
        },
        {
          id: 3,
          name: 'basil'
        },
        {
          id: 12,
          name: 'tomato'
        },
        {
          id: 8,
          name: 'onion'
        },
        {
          id: 6,
          name: 'mushroom'
        },
        {
          id: 5,
          name: 'mozzarella'
        },
        {
          id: 1,
          name: 'anchovy'
        },
        {
          id: 7,
          name: 'olive'
        },
        {
          id: 11,
          name: 'sweetcorn'
        },
        {
          id: 2,
          name: 'bacon'
        }
      ],
      id: 1
    },
    {
      name: 'Seaside Surfin\'',
      toppings: [
        {
          id: 6,
          name: 'mushroom'
        },
        {
          id: 7,
          name: 'olive'
        },
        {
          id: 2,
          name: 'bacon'
        },
        {
          id: 3,
          name: 'basil'
        },
        {
          id: 1,
          name: 'anchovy'
        },
        {
          id: 8,
          name: 'onion'
        },
        {
          id: 9,
          name: 'pepper'
        },
        {
          id: 5,
          name: 'mozzarella'
        },
        {
          id: 10,
          name: 'pepperoni'
        },
        {
          id: 11,
          name: 'sweetcorn'
        },
        {
          id: 4,
          name: 'chili'
        },
        {
          id: 12,
          name: 'tomato'
        }
      ],
      id: 2
    }
  ],
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
      return {
        ...state,
        loading: false,
        loaded: true
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

