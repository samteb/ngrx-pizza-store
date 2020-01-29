import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromServices from '../../services';
import * as pizzaActions from '../actions/pizzas.action';

@Injectable()
export class PizzasEffects {
  constructor(
    private actions$: Actions,
    private pizzaService: fromServices.PizzasService
  ) {}

  @Effect() loadPizzas$ = this.actions$.pipe(
    ofType(pizzaActions.LOAD_PIZZAS),
    switchMap(() => this.pizzaService.getPizzas().pipe(
      map(pizzas => new pizzaActions.LoadPizzasSuccess(pizzas)),
      catchError(error => of(new pizzaActions.LoadPizzasFail(error)))
    ))
  );

  @Effect() createPizza$ = this.actions$.pipe(
    ofType(pizzaActions.CREATE_PIZZA),
    map((action: pizzaActions.CreatePizza) => action.payload),
    switchMap(pizza => this.pizzaService.createPizza(pizza).pipe(
      map(newPizza => new pizzaActions.CreatePizzaSuccess(newPizza)),
      catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
    ))
  );

  @Effect() updatePizza$ = this.actions$.pipe(
    ofType(pizzaActions.UPDATE_PIZZA),
    map((action: pizzaActions.UpdatePizza) => action.payload),
    switchMap(pizza => this.pizzaService.updatePizza(pizza).pipe(
      map(newPizza => new pizzaActions.UpdatePizzaSuccess(newPizza)),
      catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
    ))
  );

  @Effect() deletePizza$ = this.actions$.pipe(
    ofType(pizzaActions.DELETE_PIZZA),
    map((action: pizzaActions.DeletePizza) => action.payload),
    switchMap(pizza => this.pizzaService.removePizza(pizza).pipe(
      map(() => new pizzaActions.DeletePizzaSuccess(pizza)),
      catchError(error => of(new pizzaActions.DeletePizzaFail(error)))
    ))
  );
}
