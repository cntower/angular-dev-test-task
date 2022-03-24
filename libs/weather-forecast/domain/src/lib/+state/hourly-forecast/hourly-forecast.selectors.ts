import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HOURLY_FORECAST_FEATURE_KEY, State } from './hourly-forecast.reducer';

// Lookup the 'HourlyForecast' feature state managed by NgRx
export const getHourlyForecastState = createFeatureSelector<State>(HOURLY_FORECAST_FEATURE_KEY);

export const getHourlyForecastLoaded = createSelector(getHourlyForecastState, (state: State) => state.loaded);

export const getHourlyForecastError = createSelector(getHourlyForecastState, (state: State) => state.error);

export const getSelectedId = createSelector(getHourlyForecastState, (state: State) => state.selectedId);
