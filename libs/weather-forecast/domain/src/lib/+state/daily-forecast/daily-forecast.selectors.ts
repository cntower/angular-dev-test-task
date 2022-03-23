import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DAILY_FORECAST_FEATURE_KEY, State, dailyForecastAdapter } from './daily-forecast.reducer';

// Lookup the 'DailyForecast' feature state managed by NgRx
export const getDailyForecastState = createFeatureSelector<State>(DAILY_FORECAST_FEATURE_KEY);

const { selectAll, selectEntities } = dailyForecastAdapter.getSelectors();

export const getDailyForecastLoaded = createSelector(getDailyForecastState, (state: State) => state.loaded);

export const getDailyForecastError = createSelector(getDailyForecastState, (state: State) => state.error);

export const getAllDailyForecast = createSelector(getDailyForecastState, (state: State) => selectAll(state));

export const getDailyForecastEntities = createSelector(getDailyForecastState, (state: State) => selectEntities(state));
