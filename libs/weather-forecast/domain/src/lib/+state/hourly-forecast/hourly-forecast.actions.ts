import { createAction, props } from '@ngrx/store';
import {HourlyForecastDto} from '../../entities/hourly-forecast-dto';

export const init = createAction('[HourlyForecast Page] Init');

export const loadHourlyForecast = createAction(
	'[HourlyForecast/API] Load HourlyForecast',
	props<{ query: string }>()
);

export const loadHourlyForecastSuccess = createAction(
	'[HourlyForecast/API] Load HourlyForecast Success',
	props<{ hourlyForecast: HourlyForecastDto }>()
);

export const loadHourlyForecastCityNotFound = createAction(
	'[HourlyForecast/API] Load HourlyForecast CityNotFound'
);

export const loadHourlyForecastFailure = createAction(
	'[HourlyForecast/API] Load HourlyForecast Failure',
	props<{ error: any }>()
);
