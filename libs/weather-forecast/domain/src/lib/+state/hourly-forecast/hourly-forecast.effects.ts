import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';

import * as HourlyForecastActions from './hourly-forecast.actions';
import {WeatherForecastApiService} from '@bp/weather-forecast/services';
import {map, of, switchMap} from 'rxjs';

@Injectable()
export class HourlyForecastEffects {
	search$ = createEffect(() =>
		this.actions$.pipe(
			ofType(HourlyForecastActions.loadHourlyForecast),
			fetch({
				run: action => this._weatherForecastApiService.getLocales(action.query)
					.pipe(
						map(locales => locales[0]),
						switchMap(locale => {
							if (locale) {
								return this._weatherForecastApiService.getHourlyForecast(locale.lat, locale.lon)
									.pipe(
										map(hourlyForecast => HourlyForecastActions.loadHourlyForecastSuccess({hourlyForecast}))
									)
							} else {
								return of(HourlyForecastActions.loadHourlyForecastCityNotFound());
							}
						})
					),
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
