import { EntityAdapter, createEntityAdapter, EntityState } from '@ngrx/entity'

import { Tutorial } from '@appModels/tutorial';
import { TutorialActions,TutorialActionTypes } from '@appStore/actions/tutorial.actions';

export interface State extends EntityState<Tutorial> {
    loaded: boolean;
    loading: boolean;
    error: any;
    selectedTutorialId: number;
    searchTutorials: Tutorial[];
     
}

export const adapter: EntityAdapter<Tutorial> = createEntityAdapter<Tutorial>();

export const initialState: State = adapter.getInitialState({
    loaded: false,
    loading: false,
    selectedTutorialId: null,
    error: null,
    searchTerm: '',
    searchTutorials: null
    
});

export function reducer(state = initialState, action: TutorialActions): State{
    switch (action.type) {
        case TutorialActionTypes.tutorialGetTutorials:
        case TutorialActionTypes.tutorialAddTutorial:
        case TutorialActionTypes.tutorialDeleteTutorial:
        case TutorialActionTypes.tutorialUpdateTutorial:
        case TutorialActionTypes.tutorialSearchTutorials:
        case TutorialActionTypes.tutorialGetTutorialById:
        return {
            ...state,
            loading: true
        };

        case TutorialActionTypes.tutorialGetTutorialsSuccess:
      return adapter.addAll(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case TutorialActionTypes.tutorialGetTutorialByIdSuccess:
      return { ...state, selectedTutorialId: action.payload.id, loading: false };

    case TutorialActionTypes.tutorialAddTutorialSuccess:
      return adapter.addOne(action.payload, {
        ...state,
        loading: false,
        loaded: true
      });

    case TutorialActionTypes.tutorialUpdateTutorialSuccess: {
      return adapter.updateOne(
        {
          id: action.payload.id,
          changes: action.payload
        },
        {
          ...state,
          loading: false,
          loaded: true
        }
      );
    }

    case TutorialActionTypes.tutorialDeleteTutorialSuccess: {
      return adapter.removeOne(action.payload.id, {
        ...state,
        loading: false,
        loaded: true
      });
    }

    case TutorialActionTypes.tutorialSearchTutorialsSuccess:
      return {
        ...state,
        searchTutorials: action.payload,
        loading: false
      };

    case TutorialActionTypes.tutorialSearchTutorialsReset:
      return {
        ...state,
        searchTutorials: null
      };

    case TutorialActionTypes.tutorialError:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };

        default:
            return state;
    }
}

export const tutorialEntitySelectors = adapter.getSelectors();
