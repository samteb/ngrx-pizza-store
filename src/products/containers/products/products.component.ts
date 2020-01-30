import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from '../../store';

import { Pizza } from '../../models/pizza.model';

@Component({
  selector: 'products',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['products.component.scss'],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  pizzas$: Observable<Pizza[]>;

  constructor(private store: Store<fromStore.ProductsState>) {}

  ngOnInit() {
    this.pizzas$ = this.store.select<Pizza[]>(fromStore.getAllPizzas);
  }
}
