import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Tutorial } from '@appModels/tutorial';

import { Store } from '@ngrx/store';

import * as fromSelectors from '@appStore/selectors';
import * as fromReducer from '@appStore/reducers';

@Component({
  selector: 'app-tutorial-detail',
  templateUrl: './tutorial-detail.component.html',
  styleUrls: ['./tutorial-detail.component.css']
})
export class TutorialDetailComponent implements OnInit {
  tutorial$: Observable<Tutorial>

  constructor(private store: Store<fromReducer.tutorial.State>) { }

  ngOnInit() {
    //this.tutorial$ = this.store.pipe(select(fromSelectors.getTutorialById));
  }

}
