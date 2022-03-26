import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';

import * as LocationActions from './forecast-locations.actions';
import {LocationEntity} from './forecast-locations.models';
import {LocationDto} from '../../entities/location-dto';
import * as DailyForecastActions from '../daily-forecast/daily-forecast.actions';
import * as HourlyForecastActions from '../hourly-forecast/hourly-forecast.actions';

export const LOCATION_FEATURE_KEY = 'location';

export interface State extends EntityState<LocationEntity> {
	error?: string | null; // last known error (if any)
	isCityNotFound?: boolean;
	isLocationLoading?: boolean;
	isDailyForecastLoading?: boolean;
	isHourlyForecastLoading?: boolean;
	notFoundCityNameQueries: { [key: string]: boolean };
}

export interface LocationPartialState {
	readonly [LOCATION_FEATURE_KEY]: State;
}

export function selectLocationId(locationEntity: LocationEntity): string {
	//In this case this would be optional since primary key is id
	return locationId(locationEntity.location);
}

export function locationId(location: LocationDto) {
	return `${location.country}|${location.state}|${location.name}`;
}

export const locationAdapter: EntityAdapter<LocationEntity> = createEntityAdapter<LocationEntity>({
	selectId: selectLocationId
});

export const initialState: State = locationAdapter.getInitialState({
	notFoundCityNameQueries: {}
});

console.log({initialState});

const forecastLocationsReducer = createReducer(
	initialState,
	on(LocationActions.search, state => ({...state, error: null, isCityNotFound: false})),
	on(LocationActions.loadLocationAndForecast, state => ({...state, isLocationLoading: true, error: null})),
	on(LocationActions.loadLocationSuccess, (state, {location, cityNameQuery}) => {
		if (location) {
			const _state = locationAdapter.addOne({location, cityNameQueries: {}}, {...state, isLocationLoading: false});
			return locationAdapter.mapOne({
				id: locationId(location),
				map: (locationEntity) =>
					({...locationEntity, cityNameQueries: {...locationEntity.cityNameQueries, [cityNameQuery]: true}})
			}, _state)
		}
		return {
			...state,
			isCityNotFound: true,
			isLocationLoading: false,
			notFoundCityNameQueries: {...state.notFoundCityNameQueries, [cityNameQuery]: true}
		}
	}),
	on(LocationActions.loadLocationFailure, (state, {error}) => ({...state, error, isLocationLoading: false})),
	on(DailyForecastActions.loadDailyForecast, state => ({...state, isDailyForecastLoading: true})),
	on(DailyForecastActions.loadDailyForecastSuccess, (state, {dailyForecast, location}) => {
		return locationAdapter.mapOne({
			id: locationId(location),
			map: (locationEntity) => ({...locationEntity, daily: dailyForecast})
		}, {...state, isDailyForecastLoading: false})
	}),
	on(DailyForecastActions.loadDailyForecastFailure, (state, {error}) => ({
		...state,
		error,
		isDailyForecastLoading: false
	})),
	on(HourlyForecastActions.loadHourlyForecast, state => ({...state, isHourlyForecastLoading: true})),
	on(HourlyForecastActions.loadHourlyForecastSuccess, (state, {hourlyForecast, location}) => {
		return locationAdapter.mapOne({
			id: locationId(location),
			map: (locationEntity) => ({...locationEntity, hourly: hourlyForecast})
		}, {...state, isHourlyForecastLoading: false})
	}),
	on(HourlyForecastActions.loadHourlyForecastFailure, (state, {error}) => ({
		...state,
		error,
		isHourlyForecastLoading: false
	})),
	on(LocationActions.notFoundQueryRepetition, state=>({...state, isCityNotFound: true}))
);

export function reducer(state: State | undefined, action: Action) {
	return forecastLocationsReducer(state, action);
}
