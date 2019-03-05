import { Type } from '@angular/core';

import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import { environment } from '../../environments/environment';

import * as fromReducers from './reducers';

import { TutorialEffects } from '@appStore/effects/Tutorial.effects';
//import { RouterEffects } from '@appStore/effects/router.effects';
import { SearchEffects } from '@appStore/effects/search.effects';


export interface State {
  tutorial: fromReducers.tutorial.State;
  search: fromReducers.search.State;
  
  
}

export const reducers: ActionReducerMap<State> = {
  tutorial: fromReducers.tutorial.reducer,
  search: fromReducers.search.reducer,
};

export const effects = [TutorialEffects, SearchEffects];

 