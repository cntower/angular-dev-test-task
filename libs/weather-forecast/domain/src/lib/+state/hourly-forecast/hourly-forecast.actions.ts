import { createAction, props } from '@ngrx/store';
import { HourlyForecastEntity } from './hourly-forecast.models';

export const init = createAction('[HourlyForecast Page] Init');

export const loadHourlyForecastSuccess = createAction(
	'[HourlyForecast/API] Load HourlyForecast Success',
	props<{ hourlyForecast: HourlyForecastEntity[] }>()
);

export const loadHourlyForecastFailure = createAction(
	'[HourlyForecast/API] Load HourlyForecast Failure',
	props<{ error: any }>()
);
