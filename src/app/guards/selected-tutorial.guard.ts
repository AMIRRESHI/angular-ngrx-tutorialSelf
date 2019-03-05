import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';

import { Store } from '@ngrx/store';

import { Observable ,  of ,  combineLatest } from 'rxjs';
import { switchMap, catchError, tap, filter, take, map } from 'rxjs/operators';

import * as fromReducers from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import { GetTutorials, GetTutorialById } from '@appStore/actions/tutorial.actions';
import { Tutorial } from '@appModels/tutorial';

@Injectable()
export class SelectedTutorialGuard implements CanActivate {
  constructor(private store: Store<fromReducers.tutorial.State>) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.checkStore(+next.params['id']).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(id: number): Observable<boolean> {
    const loaded$: Observable<boolean> = this.store.select(
      fromSelectors.getTutorialsLoaded
    );
    const selectedTutorialId$: Observable<number> = this.store.select(
      fromSelectors.getSelectedTutorialId
    );

    return combineLatest(loaded$, selectedTutorialId$).pipe(
      tap(([loaded, selectedTutorialId]) => {
        if (!loaded) {
          this.store.dispatch(new GetTutorials());
        }

        if (!selectedTutorialId || selectedTutorialId !== id) {
          this.store.dispatch(new GetTutorialById(id));
        }
      }),
      filter(
        ([loaded, selectedTutorialId]) =>
          loaded && selectedTutorialId && selectedTutorialId === id
      ),
      map(() => true),
      take(1)
    );
  }
}
