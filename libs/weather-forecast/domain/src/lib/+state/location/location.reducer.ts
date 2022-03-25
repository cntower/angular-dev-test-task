import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';

import * as LocationActions from './location.actions';
import {LocationEntity} from './location.models';
import {LocationDto} from '../../entities/location-dto';
import * as DailyForecastActions from '../daily-forecast/daily-forecast.actions';
import * as HourlyForecastActions from '../hourly-forecast/hourly-forecast.actions';

export const LOCATION_FEATURE_KEY = 'location';

export interface State extends EntityState<LocationEntity> {
	error?: string | null; // last known error (if any)
	noCityIsFound?: boolean;
}

export interface LocationPartialState {
	readonly [LOCATION_FEATURE_KEY]: State;
}

export function selectLocationId(locationEntity: LocationEntity): string {
	//In this case this would be optional since primary key is id
	return locationId(locationEntity.location);
}

function locationId(location: LocationDto) {
	return `${location.country}|${location.state}|${location.name}`;
}

export const locationAdapter: EntityAdapter<LocationEntity> = createEntityAdapter<LocationEntity>({
	selectId: selectLocationId
});

export const initialState: State = locationAdapter.getInitialState({});

console.log({initialState});

const locationReducer = createReducer(
	initialState,
	on(LocationActions.loadLocation, state => ({...state, loaded: false, error: null, noCityIsFound: false})),
	on(LocationActions.loadLocationSuccess, (state, {location, cityNameQuery}) => {
		if (location) {
			const _state = locationAdapter.addOne({location, cityNameQueries: {}}, {...state});
			return locationAdapter.mapOne({
				id: locationId(location),
				map: (locationEntity) =>
					({...locationEntity, cityNameQueries: {...locationEntity.cityNameQueries, [cityNameQuery]: true}})
			}, _state)
		}
		return {...state, noCityIsFound: true}
	}),
	on(DailyForecastActions.loadDailyForecastSuccess, (state, {dailyForecast, location}) => {
		return locationAdapter.mapOne({
			id: locationId(location),
			map: (locationEntity) => ({...locationEntity, daily: dailyForecast})
		}, state)
	}),
	on(HourlyForecastActions.loadHourlyForecastSuccess, (state, {hourlyForecast, location}) => {
		return locationAdapter.mapOne({
			id: locationId(location),
			map: (locationEntity) => ({...locationEntity, hourly: hourlyForecast})
		}, state)
	}),
	on(LocationActions.loadLocationFailure, (state, {error}) => ({...state, error}))
);

export function reducer(state: State | undefined, action: Action) {
	return locationReducer(state, action);
}
