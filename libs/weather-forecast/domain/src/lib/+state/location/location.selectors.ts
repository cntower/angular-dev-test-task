import {createFeatureSelector, createSelector} from '@ngrx/store';
import {LOCATION_FEATURE_KEY, locationAdapter, State} from './location.reducer';
import {LocationEntity} from './location.models';
import {HourlyViewModel} from '../../entities/hourly-view-model';
import {DailyViewModel} from '../../entities/daily-view-model';

// Lookup the 'Location' feature state managed by NgRx
export const getLocationState = createFeatureSelector<State>(LOCATION_FEATURE_KEY);

const {selectAll, selectEntities} = locationAdapter.getSelectors();

export const getLocationError = createSelector(getLocationState, (state: State) => state.error);

export const getLocationNoCityIsFound = createSelector(getLocationState, (state: State) => state.noCityIsFound);

export const getAllLocation = createSelector(getLocationState, (state: State) => selectAll(state));

export const getLocationEntities = createSelector(getLocationState, (state: State) => selectEntities(state));

export const getLocationByQuery = createSelector(
	getAllLocation,
	(entities: LocationEntity[], props: { cityName: string }) => {
		// return entities[0]
		return entities.find(entity => entity.cityNameQueries[props.cityName]) as LocationEntity
	}
);

export const getLocationDailyViewModel = createSelector(
	getAllLocation,
	(entities: LocationEntity[]) => entities.map(entity => ({
		cityName: entity.location.name,
		daily: entity.daily?.daily.map(day => {
			return {
				dt: day.dt * 1000,
				temp: day.temp.day - 273.15
			}
		}).slice(-7)
	} as DailyViewModel))
);

export const getLocationHourlyViewModel = createSelector(
	getAllLocation,
	(entities: LocationEntity[]) => entities.map(entity => ({
		cityName: entity.location.name,
		hourly: entity.hourly?.hourly
			.filter((value, index) => index % 3 === 0)
			.map(hour => {
				return {
					dt: hour.dt * 1000,
					temp: hour.temp - 273.15
				}
			}).slice(0, 8)
	} as HourlyViewModel))
);
