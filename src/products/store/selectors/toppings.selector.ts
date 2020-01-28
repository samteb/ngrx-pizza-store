import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromToppings from '../reducers/toppings.reducer';

export const getToppingsState = createSelector(fromFeature.getProductsState, (state: fromFeature.ProductsState) => state.toppings);
export const getToppingsEntities = createSelector(getToppingsState, (state: fromToppings.ToppingsState) => state.entities);
export const getAllToppings = createSelector(getToppingsEntities, entities => Object.keys(entities).map(id => entities[parseInt(id, 10)]));
export const getToppingsLoading = createSelector(getToppingsState, (state: fromToppings.ToppingsState) => state.loading);
export const getToppingsLoaded = createSelector(getToppingsState, (state: fromToppings.ToppingsState) => state.loaded);
export const getSelectedToppings = createSelector(getToppingsState, (state: fromToppings.ToppingsState) => state.selectedToppings);
