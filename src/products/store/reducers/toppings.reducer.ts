import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';

// state
export interface ToppingsState {
  entities: {
    [id: number]: Topping
  };
  loaded: boolean;
  loading: boolean;
  selectedToppings: number[];
}

// initial state
export const initialState: ToppingsState = {
  entities: {},
  loaded: false,
  loading: false,
  selectedToppings: []
};

// reducer
export function reducer(
  state = initialState,
  action: fromToppings.ToppingsAction
): ToppingsState {
  switch (action.type) {
    case fromToppings.VISUALISE_TOPPINGS:
      return {
        ...state,
        selectedToppings: action.payload
      };
    case fromToppings.LOAD_TOPPINGS:
      return {
        ...state,
        loading: true
      };
    case fromToppings.LOAD_TOPPINGS_SUCCESS:
      const entities = action.payload.reduce(
        (toppings: { [id: number]: Topping }, topping: Topping) => ({ ...toppings, [topping.id]: topping }),
        { ...state.entities }
      );
      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    case fromToppings.LOAD_TOPPINGS_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false
      };
  }

  return state;
}
