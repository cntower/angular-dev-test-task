import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LOCATION_FEATURE_KEY, locationAdapter, State} from './location.reducer';
import {LocationEntity} from './location.models';

// Lookup the 'Location' feature state managed by NgRx
export const getLocationState = createFeatureSelector<State>(LOCATION_FEATURE_KEY);

const {selectAll, selectEntities} = locationAdapter.getSelectors();

export const getLocationError = createSelector(getLocationState, (state: State) => state.error);

export const getLocationNoCityIsFound = createSelector(getLocationState, (state: State) => state.noCityIsFound);

export const getAllLocation = createSelector(getLocationState, (state: State) => selectAll(state));

export const getLocationEntities = createSelector(getLocationState, (state: State) => selectEntities(state));

export const getLocationByQuery = createSelector(
	getAllLocation,
	(entities: LocationEntity[], props: {cityName: string}) => {
		// return entities[0]
		return entities.find(entity => entity.cityNameQueries[props.cityName]) as LocationEntity
	}
);

export const getLocationDailyViewModel = createSelector(
	getAllLocation,
	(entities: LocationEntity[]) => {
		// return entities[0]
		return entities.map(entity => ({cityName: entity.location.name}))
	}
);
