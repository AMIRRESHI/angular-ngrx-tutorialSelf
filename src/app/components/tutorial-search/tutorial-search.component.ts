import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';

import { Observable ,  Subject ,  of } from 'rxjs';
import { Store, select } from '@ngrx/store';

import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  tap,
  first
} from 'rxjs/operators';

import { Tutorial } from '@appModels/tutorial';

import * as fromSelectors from '@appStore/selectors';

import * as fromStore from '@appStore/index';

import {
  SearchTutorials,
  SearchTutorialsReset
} from '@appStore/actions/tutorial.actions';
import { SearchReset, Search } from '@appStore/actions/search.actions';

@Component({
  selector: 'app-tutorial-search',
  templateUrl: './tutorial-search.component.html',
  styleUrls: ['./tutorial-search.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorialSearchComponent implements OnInit, OnDestroy {
  searchTerm$: Observable<string>;
  tutorials$: Observable<Tutorial[]>;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit(): void {
    this.tutorials$ = this.store.pipe(select(fromSelectors.getSearchTutorials));
    this.searchTerm$ = this.store.pipe(select(fromSelectors.getSearch));
  }

  ngOnDestroy(): void {
    this.store.dispatch(new SearchReset());
  }

  search(term: string): void {
    this.store.dispatch(new Search(term));
  }
}
