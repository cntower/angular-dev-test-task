import { createAction, props } from '@ngrx/store';
import {LocationDto} from '../../entities/location-dto';
import {LocationEntity} from './location.models';
import {TimeInterval} from '../../entities/time-interval';

export const init = createAction('[Location Page] Init');

export const addForecast = createAction(
	'[Location/API] Add Forecast',
	props<{ locationEntity: LocationEntity, mode: TimeInterval }>()
);

export const loadLocation = createAction(
	'[Location/API] Load Location',
	props<{ cityNameQuery: string }>()
);

export const loadLocationSuccess = createAction(
	'[Location/API] Load Location Success',
	props<{ location: LocationDto, cityNameQuery: string }>()
);

export const loadLocationFailure = createAction('[Location/API] Load Location Failure', props<{ error: any }>());
