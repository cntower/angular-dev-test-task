import { createAction, props } from '@ngrx/store';
import {LocationDto} from '../../entities/location-dto';

export const init = createAction('[Location Page] Init');

export const loadLocation = createAction(
	'[Location/API] Load Location',
	props<{ cityNameQuery: string }>()
);

export const loadLocationSuccess = createAction(
	'[Location/API] Load Location Success',
	props<{ location: LocationDto, cityNameQuery: string }>()
);

export const loadLocationFailure = createAction('[Location/API] Load Location Failure', props<{ error: any }>());
