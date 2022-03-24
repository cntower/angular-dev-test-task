import { createReducer, on, Action } from '@ngrx/store';

import * as DailyForecastActions from './daily-forecast.actions';
// import { DailyForecastEntity } from './daily-forecast.models';

export const DAILY_FORECAST_FEATURE_KEY = 'dailyForecast';

export interface State {
	selectedId?: string | number; // which DailyForecast record has been selected
	loaded: boolean; // has the DailyForecast list been loaded
	error?: string | null; // last known error (if any)
}

export interface DailyForecastPartialState {
	readonly [DAILY_FORECAST_FEATURE_KEY]: State;
}

export const initialState: State = {
	// set initial required properties
	loaded: false,
};

const dailyForecastReducer = createReducer(
	initialState,
	on(DailyForecastActions.init, state => ({ ...state, loaded: false, error: null })),
	// on(DailyForecastActions.loadDailyForecastSuccess, (state, { dailyForecast }) =>
	// 	dailyForecastAdapter.setAll(dailyForecast, { ...state, loaded: true })
	// ),
	on(DailyForecastActions.loadDailyForecastFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
	return dailyForecastReducer(state, action);
}
