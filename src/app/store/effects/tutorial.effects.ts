import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { switchMap, map, catchError, tap, debounceTime } from 'rxjs/operators';
import { of } from 'rxjs';

import {
  TutorialActionTypes,
  GetTutorialsSuccess,
  TutorialError,
  AddTutorial,
  AddTutorialSuccess,
  DeleteTutorialSuccess,
  DeleteTutorial,
  GetTutorialById,
  GetTutorialByIdSuccess,
  UpdateTutorialSuccess,
  SearchTutorials,
  SearchTutorialsSuccess
} from '@appStore/actions/tutorial.actions';
import { TutorialService } from '@appServices/tutorial.service';

//import * as fromRouterActions from '@appStore/actions/router.actions';

@Injectable()
export class TutorialEffects {
  constructor(private actions$: Actions, private tutorialService: TutorialService) {}

  @Effect()
  loadTutorials$ = this.actions$.pipe(
    ofType(TutorialActionTypes.tutorialGetTutorials),
    switchMap(() =>
      this.tutorialService
        .getTutorials()
        .pipe(
          map(tutorials => new GetTutorialsSuccess(tutorials)),
          catchError(error => of(new TutorialError(error)))
        )
    )
  );

  @Effect()
  getTutorialById$ = this.actions$.pipe(
    ofType(TutorialActionTypes.tutorialGetTutorialById),
    switchMap((action: GetTutorialById) =>
      this.tutorialService
        .getTutorial(action.payload)
        .pipe(
          map(tutorial => new GetTutorialByIdSuccess(tutorial)),
          catchError(error => of(new TutorialError(error)))
        )
    )
  );

  @Effect()
  addTutorial$ = this.actions$.pipe(
    ofType(TutorialActionTypes.tutorialAddTutorial),
    switchMap((action: AddTutorial) =>
      this.tutorialService
        .addTutorial(action.payload)
        .pipe(
          map(tutorial => new AddTutorialSuccess(tutorial)),
          catchError(error => of(new TutorialError(error)))
        )
    )
  );

  @Effect()
  updateHero$ = this.actions$.pipe(
    ofType(TutorialActionTypes.tutorialUpdateTutorial),
    switchMap((action: AddTutorial) =>
      this.tutorialService
        .updateTutorial(action.payload)
        .pipe(
          map(hero => new UpdateTutorialSuccess(action.payload)),
          catchError(error => of(new TutorialError(error)))
        )
    )
  );

  @Effect()
  deleteTutorial$ = this.actions$.pipe(
    ofType(TutorialActionTypes.tutorialDeleteTutorial),
    switchMap((action: DeleteTutorial) =>
      this.tutorialService
        .deleteTutorial(action.payload)
        .pipe(
          map(() => new DeleteTutorialSuccess(action.payload)),
          catchError(error => of(new TutorialError(error)))
        )
    )
  );

  @Effect()
  searchTutorials$ = this.actions$.pipe(
    ofType(TutorialActionTypes.tutorialSearchTutorials),
    switchMap((action: SearchTutorials) =>
      this.tutorialService
        .searchTutorials(action.payload)
        .pipe(
          map(tutorials => new SearchTutorialsSuccess(tutorials)),
          catchError(error => of(new TutorialError(error)))
        )
    )
  );

  // @Effect()
  // updateTutorialSuccess$ = this.actions$.pipe(
  //   ofType(TutorialActionTypes.tutorialUpdateTutorialSuccess),
  //   map(tutorial => new fromRouterActions.Go({ path: ['/tutorials'] }))
  // );
}
