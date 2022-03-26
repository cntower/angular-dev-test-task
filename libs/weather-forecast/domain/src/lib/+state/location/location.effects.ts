import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';

import * as LocationActions from './location.actions';
import {WeatherForecastApiService} from '@bp/weather-forecast/services';
import {filter, map, tap} from 'rxjs';
import {Dictionary} from '@ngrx/entity';
import {DailyForecastActions, HourlyForecastActions, LocationReducer, TimeInterval} from '@bp/weather-forecast/domain';
import {Store} from '@ngrx/store';

@Injectable()
export class LocationEffects {
	loadLocation$ = createEffect(() =>
		this._actions$.pipe(
			ofType(LocationActions.loadLocation),
			fetch({
				run: action => {
					return this._weatherForecastApiService.getLocales(action.cityNameQuery)
						.pipe(
							map(locations => LocationActions.loadLocationSuccess({
								location: locations[0],
								cityNameQuery: action.cityNameQuery
							}))
						)
				},
				onError: (action, error) => {
					console.error('Error', error);
					return LocationActions.loadLocationFailure({error});
				},
			})
		)
	);

	addForecast$ = createEffect(() => this._actions$.pipe(
		ofType(LocationActions.addForecast),
		filter(({locationEntity, mode}) => !(locationEntity as Dictionary<any>)[mode]),
		tap(({locationEntity, mode}) => {
			if (mode === TimeInterval.daily) {
				this._store.dispatch(DailyForecastActions.loadDailyForecast({location: locationEntity.location}))
			}
			if (mode === TimeInterval.hourly) {
				this._store.dispatch(HourlyForecastActions.loadHourlyForecast({location: locationEntity.location}))
			}
		})
	), {dispatch: false}
	)

	constructor(
		private readonly _actions$: Actions,
		private readonly _weatherForecastApiService: WeatherForecastApiService,
		private readonly _store: Store<LocationReducer.State>,
	) {
	}
}
