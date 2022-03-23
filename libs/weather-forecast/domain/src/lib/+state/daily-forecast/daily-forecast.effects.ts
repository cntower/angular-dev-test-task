import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';

import * as DailyForecastActions from './daily-forecast.actions';
// import * as DailyForecastFeature from './daily-forecast.reducer';

@Injectable()
export class DailyForecastEffects {
	init$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DailyForecastActions.init),
			fetch({
				run: action => {
					// Your custom service 'load' logic goes here. For now just return a success action...
					return DailyForecastActions.loadDailyForecastSuccess({ dailyForecast: [] });
				},
				onError: (action, error) => {
					console.error('Error', error);
					return DailyForecastActions.loadDailyForecastFailure({ error });
				},
			})
		)
	);

	constructor(private readonly actions$: Actions) {}
}
