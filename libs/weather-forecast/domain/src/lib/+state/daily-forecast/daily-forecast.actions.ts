import { createAction, props } from '@ngrx/store';
import { DailyForecastEntity } from './daily-forecast.models';

export const init = createAction('[DailyForecast Page] Init');

export const loadDailyForecastSuccess = createAction(
	'[DailyForecast/API] Load DailyForecast Success',
	props<{ dailyForecast: DailyForecastEntity[] }>()
);

export const loadDailyForecastFailure = createAction(
	'[DailyForecast/API] Load DailyForecast Failure',
	props<{ error: any }>()
);
