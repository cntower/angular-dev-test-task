import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as HourlyForecastActions from './hourly-forecast.actions';
import { HourlyForecastEntity } from './hourly-forecast.models';

export const HOURLY_FORECAST_FEATURE_KEY = 'hourlyForecast';

export interface State extends EntityState<HourlyForecastEntity> {
	selectedId?: string | number; // which HourlyForecast record has been selected
	loaded: boolean; // has the HourlyForecast list been loaded
	error?: string | null; // last known error (if any)
}

export interface HourlyForecastPartialState {
	readonly [HOURLY_FORECAST_FEATURE_KEY]: State;
}

export const hourlyForecastAdapter: EntityAdapter<HourlyForecastEntity> = createEntityAdapter<HourlyForecastEntity>();

export const initialState: State = hourlyForecastAdapter.getInitialState({
	// set initial required properties
	loaded: false,
});

const hourlyForecastReducer = createReducer(
	initialState,
	on(HourlyForecastActions.init, state => ({ ...state, loaded: false, error: null })),
	on(HourlyForecastActions.loadHourlyForecastSuccess, (state, { hourlyForecast }) =>
		hourlyForecastAdapter.setAll(hourlyForecast, { ...state, loaded: true })
	),
	on(HourlyForecastActions.loadHourlyForecastFailure, (state, { error }) => ({ ...state, error }))
);

export function reducer(state: State | undefined, action: Action) {
	return hourlyForecastReducer(state, action);
}
