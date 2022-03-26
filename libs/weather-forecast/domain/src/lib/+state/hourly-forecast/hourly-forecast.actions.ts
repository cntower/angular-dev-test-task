import { createAction, props } from '@ngrx/store';
import {HourlyForecastDto} from '../../entities/hourly-forecast-dto';
import {LocationDto} from '../../entities/location-dto';

export const loadHourlyForecast = createAction(
	'[Forecast Page] Load HourlyForecast',
	props<{ location: LocationDto }>()
);

export const loadHourlyForecastSuccess = createAction(
	'[HourlyForecast/API] Load HourlyForecast Success',
	props<{ hourlyForecast: HourlyForecastDto, location: LocationDto }>()
);

export const loadHourlyForecastFailure = createAction(
	'[HourlyForecast/API] Load HourlyForecast Failure',
	props<{ error: any }>()
);
