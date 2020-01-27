import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromPizzas from './pizzas.reducer';

// state
export interface ProductsState {
  pizzas: fromPizzas.PizzaState;
}

// reducers
export const reducers: ActionReducerMap<ProductsState> = {
  pizzas: fromPizzas.reducer
};

// selectors
export const getProductsState = createFeatureSelector<ProductsState>('products');
export const getPizzasState = createSelector(getProductsState, (state: ProductsState) => state.pizzas);
export const getAllPizzas = createSelector(getPizzasState, fromPizzas.getPizzas);
export const getPizzasLoading = createSelector(getPizzasState, fromPizzas.getPizzasLoading);
export const getPizzasLoaded = createSelector(getPizzasState, fromPizzas.getPizzasLoaded);
