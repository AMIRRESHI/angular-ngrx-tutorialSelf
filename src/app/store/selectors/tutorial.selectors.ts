import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromReducers from '@appStore/reducers';

export const getTutorialStore = createFeatureSelector('tutorial');

export const getTutorialEntities = createSelector(
    getTutorialStore,
    fromReducers.tutorial.tutorialEntitySelectors.selectAll
);

export const getTutorials = createSelector(getTutorialEntities, entities => {
    return Object.values(entities);
});

export const getTopTutorials = createSelector(getTutorialEntities, entities => {
    return Object.values(entities).slice(1, 5);
  });

export const getTutorialsLoaded = createSelector(
    getTutorialStore,
    (tutorialStore: fromReducers.tutorial.State) => tutorialStore.loaded
  );

  export const getTutorialsLoading = createSelector(
    getTutorialStore,
    (tutorialStore: fromReducers.tutorial.State) => tutorialStore.loading
  );

  export const getSelectedTutorialId = createSelector(
    getTutorialStore,
    (tutorialStore: fromReducers.tutorial.State) => tutorialStore.selectedTutorialId
  );

  export const getSearchTutorials = createSelector(
    getTutorialStore,
    (tutorialStore: fromReducers.tutorial.State) => tutorialStore.searchTutorials
  );

  export const getTutorialById = createSelector(
    getTutorialEntities,
    getSelectedTutorialId,
    (entities, id) => entities.find(i => i.id === id)
  );
  
  export const getTutorialsError = createSelector(
    getTutorialStore,
    (tutorialStore: fromReducers.tutorial.State) => tutorialStore.error
  );