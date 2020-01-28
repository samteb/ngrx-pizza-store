import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromService from '../../services';
import * as toppingActions from '../actions/toppings.action';

@Injectable()
export class ToppingsEffects {
  constructor(
    private actions$: Actions,
    private toppingsService: fromService.ToppingsService
  ) {}

  @Effect() loadToppings$ = this.actions$.pipe(
    ofType(toppingActions.LOAD_TOPPINGS),
    switchMap(() => this.toppingsService.getToppings().pipe(
      map(toppings => new toppingActions.LoadToppingsSuccess(toppings)),
      catchError(error => of(new toppingActions.LoadToppingsFail(error)))
    ))
  );
}
