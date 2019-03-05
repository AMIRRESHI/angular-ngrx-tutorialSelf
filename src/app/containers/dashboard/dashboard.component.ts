import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

import { Tutorial } from '@appModels/tutorial';
//import { TutorialService } from '@appServices/tutorial.service';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducers from '@appStore/reducers';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  topTutorials$: Observable<Tutorial[]>;

  constructor(private store: Store<fromReducers.tutorial.State>) {}

  ngOnInit() {
    this.topTutorials$ = this.store.pipe(select(fromSelectors.getTopTutorials));
  }
}
