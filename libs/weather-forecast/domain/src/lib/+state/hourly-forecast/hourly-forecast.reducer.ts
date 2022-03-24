import {Action, createReducer, on} from '@ngrx/store';

import * as HourlyForecastActions from './hourly-forecast.actions';
import {HourlyForecastDto} from '../../entities/hourly-forecast-dto';

export const HOURLY_FORECAST_FEATURE_KEY = 'hourlyForecast';

export interface State {
	hourlyForecast: HourlyForecastDto | null,
	loaded: boolean; // has the HourlyForecast list been loaded
	error?: string | null; // last known error (if any)
	cityNotFound: boolean | null;
}

export interface HourlyForecastPartialState {
	readonly [HOURLY_FORECAST_FEATURE_KEY]: State;
}

export const initialState: State = {
	// set initial required properties
	hourlyForecast: null,
	loaded: false,
	cityNotFound: null,
};

const hourlyForecastReducer = createReducer(
	initialState,
	on(HourlyForecastActions.loadHourlyForecast, state => ({...state, loaded: false, error: null, cityNotFound: false})),
	on(HourlyForecastActions.loadHourlyForecastSuccess, (state, {hourlyForecast}) =>
		({...state, hourlyForecast, loaded: true})
	),
	on(HourlyForecastActions.loadHourlyForecastFailure, (state, {error}) => ({...state, error})),
	on(HourlyForecastActions.loadHourlyForecastCityNotFound, state => ({...state, cityNotFound: true}))
);

export function reducer(state: State | undefined, action: Action) {
	return hourlyForecastReducer(state, action);
}
