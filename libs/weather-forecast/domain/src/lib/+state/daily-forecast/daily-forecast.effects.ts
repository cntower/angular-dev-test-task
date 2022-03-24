import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';

import * as DailyForecastActions from './daily-forecast.actions';
import {map, of, switchMap} from 'rxjs';
import {WeatherForecastApiService} from '@bp/weather-forecast/services';

@Injectable()
export class DailyForecastEffects {
	search$ = createEffect(() =>
		this.actions$.pipe(
			ofType(DailyForecastActions.loadDailyForecast),
			fetch({
				run: action => this._weatherForecastApiService.getLocales(action.query)
					.pipe(
						map(locales => locales[0]),
						switchMap(locale => {
							if (locale) {
								return this._weatherForecastApiService.getDailyForecast(locale.lat, locale.lon)
									.pipe(
										map(dailyForecast => DailyForecastActions.loadDailyForecastSuccess({dailyForecast, locale}))
									)
							} else {
								return of(DailyForecastActions.loadDailyForecastCityNotFound());
							}
						})
					),
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
