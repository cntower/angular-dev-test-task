import { createFeatureSelector, createSelector } from '@ngrx/store';
import { HOURLY_FORECAST_FEATURE_KEY, State, hourlyForecastAdapter } from './hourly-forecast.reducer';

// Lookup the 'HourlyForecast' feature state managed by NgRx
export const getHourlyForecastState = createFeatureSelector<State>(HOURLY_FORECAST_FEATURE_KEY);

const { selectAll, selectEntities } = hourlyForecastAdapter.getSelectors();

export const getHourlyForecastLoaded = createSelector(getHourlyForecastState, (state: State) => state.loaded);

export const getHourlyForecastError = createSelector(getHourlyForecastState, (state: State) => state.error);

export const getAllHourlyForecast = createSelector(getHourlyForecastState, (state: State) => selectAll(state));

export const getHourlyForecastEntities = createSelector(getHourlyForecastState, (state: State) =>
	selectEntities(state)
);

export const getSelectedId = createSelector(getHourlyForecastState, (state: State) => state.selectedId);

export const getSelected = createSelector(getHourlyForecastEntities, getSelectedId, (entities, selectedId) =>
	selectedId ? entities[selectedId] : undefined
);
