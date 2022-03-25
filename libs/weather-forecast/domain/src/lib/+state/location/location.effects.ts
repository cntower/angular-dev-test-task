import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as LocationActions from './location.actions';
import {WeatherForecastApiService} from '@bp/weather-forecast/services';
import {map} from 'rxjs';

@Injectable()
export class LocationEffects {
	loadLocation$ = createEffect(() =>
		this.actions$.pipe(
			ofType(LocationActions.loadLocation),
			fetch({
				run: action => {
					return  this._weatherForecastApiService.getLocales(action.cityNameQuery)
						.pipe(
							map(locations=>LocationActions.loadLocationSuccess({ location: locations[0], cityNameQuery: action.cityNameQuery}))
						)
				},
				onError: (action, error) => {
					console.error('Error', error);
					return LocationActions.loadLocationFailure({ error });
				},
			})
		)
	);

	constructor(
		private readonly actions$: Actions,
		private _weatherForecastApiService: WeatherForecastApiService,
	) {}
}
