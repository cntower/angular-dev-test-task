import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';

import * as DailyForecastActions from './daily-forecast.actions';
import {map} from 'rxjs';
import {WeatherForecastApiService} from '@bp/weather-forecast/services';

@Injectable()
export class DailyForecastEffects {
	loadDailyForecast$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DailyForecastActions.loadDailyForecast),
			fetch({
				run: action => {
					return this._weatherForecastApiService.getDailyForecast(action.location.lat, action.location.lon)
						.pipe(
							map(dailyForecast => DailyForecastActions.loadDailyForecastSuccess({dailyForecast, location: action.location}))
						)
				},
				onError: (action, error) => {
					console.error('Error', error);
					return DailyForecastActions.loadDailyForecastFailure({error});
				},
			})
		)
	);

	constructor(
		private readonly actions$: Actions,
		private _weatherForecastApiService: WeatherForecastApiService,
	) {
	}
}
