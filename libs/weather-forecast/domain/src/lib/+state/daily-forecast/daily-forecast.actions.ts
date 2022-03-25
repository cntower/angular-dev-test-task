import { createAction, props } from '@ngrx/store';
import {DailyForecastDto} from '../../entities/daily-forecast-dto';
import {LocationDto} from '../../entities/location-dto';

export const init = createAction('[DailyForecast Page] Init');

export const loadDailyForecast = createAction(
	'[DailyForecast/API] Load DailyForecast',
	props<{ location: LocationDto }>()
);

export const loadDailyForecastSuccess = createAction(
	'[DailyForecast/API] Load DailyForecast Success',
	props<{ dailyForecast: DailyForecastDto, location: LocationDto }>()
);

export const loadDailyForecastFailure = createAction(
	'[DailyForecast/API] Load DailyForecast Failure',
	props<{ error: any }>()
);
