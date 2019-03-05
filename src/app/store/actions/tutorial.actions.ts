import { Action } from '@ngrx/store';
import { Tutorial } from '@appModels/tutorial';



export enum TutorialActionTypes {
    tutorialGetTutorials = '[Tutorial] get',
    tutorialGetTutorialsSuccess = '[Tutorial] get tutorials success',
    tutorialAddTutorial = '[Tutorial] add tutorial',
    tutorialAddTutorialSuccess = '[Tutorial] add tutorial success',
    tutorialDeleteTutorial = '[Tutorial] delete tutorial',
    tutorialDeleteTutorialSuccess = '[Tutorial] delete tutorial success',
    tutorialGetTutorialById = '[Tutorial] get tutorial by id',
    tutorialGetTutorialByIdSuccess = '[Tutorial] get tutorial by id success',
    tutorialUpdateTutorial = '[Tutorial] update tutorial',
    tutorialUpdateTutorialSuccess = '[Tutorial] update tutorial success',
    tutorialSearchTutorials = '[Tutorial] search tutorials',
    tutorialSearchTutorialsSuccess = '[Tutorial] search tutorials success',
    tutorialSearchTutorialsReset = '[Tutorial] search tutorials reset',
    tutorialError = '[Tutorial] error'
}

export class GetTutorials implements Action {
    readonly type = TutorialActionTypes.tutorialGetTutorials;
}

export class GetTutorialsSuccess implements Action {
    readonly type = TutorialActionTypes.tutorialGetTutorialsSuccess;
    constructor(public payload: Tutorial[]){}
}

export class AddTutorial implements Action {
    readonly type = TutorialActionTypes.tutorialAddTutorial;
    constructor(public payload: Tutorial){}
}

export class AddTutorialSuccess implements Action { 
    readonly type = TutorialActionTypes.tutorialAddTutorialSuccess;
    constructor(public payload: Tutorial){}
}

export class GetTutorialById implements Action {
    readonly type = TutorialActionTypes.tutorialGetTutorialById;
    constructor(public payload: number) {}
}


export class GetTutorialByIdSuccess implements Action {
    readonly type = TutorialActionTypes.tutorialGetTutorialByIdSuccess;
    constructor(public payload: Tutorial) {}
  }
  
  export class UpdateTutorial implements Action {
    readonly type = TutorialActionTypes.tutorialUpdateTutorial;
    constructor(public payload: Tutorial) {}
  }
  
  export class UpdateTutorialSuccess implements Action {
    readonly type = TutorialActionTypes.tutorialUpdateTutorialSuccess;
    constructor(public payload: Tutorial) {}
  }
  
  export class DeleteTutorial implements Action {
    readonly type = TutorialActionTypes.tutorialDeleteTutorial;
    constructor(public payload: Tutorial) {}
  }
  
  export class DeleteTutorialSuccess implements Action {
    readonly type = TutorialActionTypes.tutorialDeleteTutorialSuccess;
    constructor(public payload: Tutorial) {}
  }
  
  export class SearchTutorials implements Action {
    readonly type = TutorialActionTypes.tutorialSearchTutorials;
    constructor(public payload: string) {}
  }
  
  export class SearchTutorialsSuccess implements Action {
    readonly type = TutorialActionTypes.tutorialSearchTutorialsSuccess;
    constructor(public payload: Tutorial[]) {}
  }
  
  export class SearchTutorialsReset implements Action {
    readonly type = TutorialActionTypes.tutorialSearchTutorialsReset;
  }

export class TutorialError implements Action {
    readonly type = TutorialActionTypes.tutorialError;
    constructor(public payload: any) {}
  }

export type TutorialActions =
  | GetTutorials
  | GetTutorialsSuccess
  | AddTutorial
  | AddTutorialSuccess
  | GetTutorialById
  | GetTutorialByIdSuccess
  | UpdateTutorial
  | UpdateTutorialSuccess
  | DeleteTutorial
  | DeleteTutorialSuccess
  | SearchTutorials
  | SearchTutorialsSuccess
  | SearchTutorialsReset
  | TutorialError
 