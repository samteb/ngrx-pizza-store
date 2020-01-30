import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';
import * as fromStore from '../../store';

@Component({
  selector: 'product-item',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['product-item.component.scss'],
  templateUrl: './product-item.component.html'
})
export class ProductItemComponent implements OnInit {
  pizza$: Observable<Pizza>;
  visualise$: Observable<Pizza>;
  toppings$: Observable<Topping[]>;

  constructor(
    private store: Store<fromStore.ProductsState>
  ) {}

  ngOnInit() {
    this.pizza$ = this.store.select(fromStore.getSelectedPizza).pipe(
      tap((pizza: Pizza = null) => {
        const pizzaExists = !!(pizza && pizza.toppings);
        const toppings = pizzaExists ? pizza.toppings.map(topping => topping.id) : [];
        this.store.dispatch(new fromStore.VisualiseToppings(toppings));
      })
    );
    this.visualise$ = this.store.select(fromStore.getPizzaVisualised);
    this.toppings$ = this.store.select(fromStore.getAllToppings);
  }

  onSelect(event: number[]) {
    this.store.dispatch(new fromStore.VisualiseToppings(event));
  }

  onCreate(event: Pizza) {
    this.store.dispatch(new fromStore.CreatePizza(event));
  }

  onUpdate(event: Pizza) {
    this.store.dispatch(new fromStore.UpdatePizza(event));
  }

  onRemove(event: Pizza) {
    const remove = window.confirm('Are you sure?');
    if (remove) {
      this.store.dispatch(new fromStore.DeletePizza(event));
    }
  }
}
