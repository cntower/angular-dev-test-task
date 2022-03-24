import { createAction, props } from '@ngrx/store';
import {DailyForecastDto} from '../../entities/daily-forecast-dto';
import {LocalesItemDto} from '../../entities/locales-item-dto';

export const init = createAction('[DailyForecast Page] Init');

export const loadDailyForecast = createAction(
	'[DailyForecast/API] Load DailyForecast',
	props<{ query: string }>()
);

export const loadDailyForecastSuccess = createAction(
	'[DailyForecast/API] Load DailyForecast Success',
	props<{ dailyForecast: DailyForecastDto, locale: LocalesItemDto }>()
);

export const loadDailyForecastCityNotFound = createAction(
	'[DailyForecast/API] Load DailyForecast CityNotFound'
);

export const loadDailyForecastFailure = createAction(
	'[DailyForecast/API] Load DailyForecast Failure',
	props<{ error: any }>()
);
