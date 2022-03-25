import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';

import * as HourlyForecastActions from './hourly-forecast.actions';
import {WeatherForecastApiService} from '@bp/weather-forecast/services';
import {map} from 'rxjs';

@Injectable()
export class HourlyForecastEffects {
	loadHourlyForecast$ = createEffect(() =>
		this.actions$.pipe(
			ofType(HourlyForecastActions.loadHourlyForecast),
			fetch({
				run: action => {
					return this._weatherForecastApiService.getHourlyForecast(action.location.lat, action.location.lon)
						.pipe(
							map(hourlyForecast => HourlyForecastActions.loadHourlyForecastSuccess({hourlyForecast, location: action.location}))
						)
				},
				onError: (action, error) => {
					console.error('Error', error);
					return HourlyForecastActions.loadHourlyForecastFailure({error});
				},
			})
		)
	);

	constructor(
		private actions$: Actions,
		private _weatherForecastApiService: WeatherForecastApiService,
	) {
	}
}
