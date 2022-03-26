import { createAction, props } from '@ngrx/store';
import {DailyForecastDto} from '../../entities/daily-forecast-dto';
import {LocationDto} from '../../entities/location-dto';

export const loadDailyForecast = createAction(
	'[Location Page] Load DailyForecast',
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
