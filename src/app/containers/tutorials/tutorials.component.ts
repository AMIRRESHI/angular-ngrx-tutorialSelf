import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { Observable } from 'rxjs';

import { Tutorial } from '@appModels/tutorial';

import * as fromReducer from '@appStore/reducers';

import * as fromSelectors from '@appStore/selectors';
import { AddTutorial, DeleteTutorial } from '@appStore/actions/tutorial.actions';

@Component({
  selector: 'app-tutorials',
  templateUrl: './tutorials.component.html',
  styleUrls: ['./tutorials.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorialsComponent implements OnInit {
  tutorials$: Observable<Tutorial[]>

  constructor(private store: Store<fromReducer.tutorial.State>) { 

    console.log('inside TutorialsComponent');
  }

  ngOnInit() {
    this.tutorials$ = this.store.pipe(select(fromSelectors.getTutorials));

    //this.store.pipe(select(fromSelectors.getTutorialEntities)).subscribe( t => console.log(t) );
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.store.dispatch(new AddTutorial({ name } as Tutorial));
  }

  delete(tutorial: Tutorial): void {
    this.store.dispatch(new DeleteTutorial(tutorial));
  }
 

}
