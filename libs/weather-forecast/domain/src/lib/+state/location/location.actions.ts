import { createAction, props } from '@ngrx/store';
import {LocationDto} from '../../entities/location-dto';
import {LocationEntity} from './location.models';
import {TimeInterval} from '../../entities/time-interval';

export const init = createAction('[Location Page] Init');

export const search = createAction(
	'[Location/API] Search',
	props<{ cityNameQuery: string, timeInterval: TimeInterval }>()
);

export const loadLocationAndForecast = createAction(
	'[Location/API] Load Location And Forecast',
	props<{ cityNameQuery: string, timeInterval: TimeInterval }>()
);

export const addForecast = createAction(
	'[Location/API] Add Forecast',
	props<{ locationEntity: LocationEntity, timeInterval: TimeInterval }>()
);

export const loadLocationSuccess = createAction(
	'[Location/API] Load Location Success',
	props<{ location: LocationDto, cityNameQuery: string, timeInterval: TimeInterval }>()
);

export const loadLocationFailure = createAction('[Location/API] Load Location Failure', props<{ error: any }>());
