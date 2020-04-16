import { ErrorHandler, Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, Router, RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';
import { StoreModule, MetaReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ApmService, ApmErrorHandler } from '@elastic/apm-rum-angular';

import { reducers, effects, CustomSerializer } from './store';

// not used in production
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { environment } from '../environments/environment';

export const metaReducers: MetaReducer<any>[] = !environment.production ? [ storeFreeze ] : [];

// bootstrap
import { AppComponent } from './containers/app/app.component';

// routes
export const ROUTES: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'products' },
  { path: 'products', loadChildren: '../products/products.module#ProductsModule' },
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    RouterModule.forRoot(ROUTES),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot(effects),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    {
      provide: RouterStateSerializer,
      useClass: CustomSerializer
    },
    {
      provide: ApmService,
      useClass: ApmService,
      deps: [ Router ]
    },
    {
      provide: ErrorHandler,
      useClass: ApmErrorHandler
    }
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ],
})
export class AppModule {
  constructor(@Inject(ApmService) service: ApmService) {
    // API is exposed through this apm instance
    const apm = service.init({
      serviceName: 'angular-app',
      serverUrl: 'http://localhost:8200'
    });

    apm.setUserContext({
      username: 'foo',
      id: 'bar'
    });
  }
}
