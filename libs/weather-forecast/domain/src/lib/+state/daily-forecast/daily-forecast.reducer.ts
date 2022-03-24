import { createReducer, on, Action } from '@ngrx/store';

import * as DailyForecastActions from './daily-forecast.actions';
import {DailyForecastDto} from '../../entities/daily-forecast-dto';
import {LocalesItemDto} from '../../entities/locales-item-dto';

export const DAILY_FORECAST_FEATURE_KEY = 'dailyForecast';

export interface State {
	dailyForecast: DailyForecastDto | null;
	locale: LocalesItemDto | null;
	loaded: boolean; // has the DailyForecast list been loaded
	error?: string | null; // last known error (if any)
	cityNotFound: boolean | null;
}

export interface DailyForecastPartialState {
	readonly [DAILY_FORECAST_FEATURE_KEY]: State;
}

export const initialState: State = {
	// set initial required properties
	dailyForecast: null,
	loaded: false,
	cityNotFound: null,
	locale: null,
};

const dailyForecastReducer = createReducer(
	initialState,
	on(DailyForecastActions.loadDailyForecast, state => ({ ...state, loaded: false, error: null, cityNotFound: null })),
	on(DailyForecastActions.loadDailyForecastSuccess, (state, { dailyForecast, locale }) =>
		({ ...state, dailyForecast, locale, loaded: true })
	),
	on(DailyForecastActions.loadDailyForecastFailure, (state, { error }) => ({ ...state, error })),
	on(DailyForecastActions.loadDailyForecastCityNotFound, state => ({ ...state, cityNotFound: true }))
);

export function reducer(state: State | undefined, action: Action) {
	return dailyForecastReducer(state, action);
}
