import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable ,  of } from 'rxjs';
import { switchMap, catchError, tap, filter, take } from 'rxjs/operators';

import * as fromReducers from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import { GetTutorials } from '@appStore/actions/tutorial.actions';

@Injectable()
export class TutorialsGuard implements CanActivate {
  constructor(private store: Store<fromReducers.tutorial.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this.store.select(fromSelectors.getTutorialsLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new GetTutorials());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
