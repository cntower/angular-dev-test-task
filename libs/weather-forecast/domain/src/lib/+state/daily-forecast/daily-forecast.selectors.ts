import {createFeatureSelector, createSelector} from '@ngrx/store';
import {DAILY_FORECAST_FEATURE_KEY, State} from './daily-forecast.reducer';

// Lookup the 'DailyForecast' feature state managed by NgRx
export const getDailyForecastState = createFeatureSelector<State>(DAILY_FORECAST_FEATURE_KEY);

export const getDailyForecastLoaded = createSelector(getDailyForecastState, (state: State) => state.loaded);

export const getDailyForecastError = createSelector(getDailyForecastState, (state: State) => state.error);

export const getDailyForecast = createSelector(getDailyForecastState, (state: State) => state.dailyForecast);

export const getDailyForecastCityNotFound = createSelector(getDailyForecastState, (state: State) => state.cityNotFound);
