import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as HourlyForecastActions from './hourly-forecast.actions';
// import * as HourlyForecastFeature from './hourly-forecast.reducer';

@Injectable()
export class HourlyForecastEffects {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(HourlyForecastActions.init),
			fetch({
				run: action => {
					// Your custom service 'load' logic goes here. For now just return a success action...
					return HourlyForecastActions.loadHourlyForecastSuccess({ hourlyForecast: [] });
				},
				onError: (action, error) => {
					console.error('Error', error);
					return HourlyForecastActions.loadHourlyForecastFailure({ error });
				},
			})
		)
	);

	constructor(private readonly actions$: Actions) {}
}
