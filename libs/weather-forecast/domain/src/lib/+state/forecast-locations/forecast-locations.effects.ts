import {Injectable} from '@angular/core';
import {Actions, concatLatestFrom, createEffect, ofType} from '@ngrx/effects';
import {fetch} from '@nrwl/angular';
import * as LocationActions from './forecast-locations.actions';
import * as LocationSelectors from './forecast-locations.selectors';
import {WeatherForecastApiService} from '@bp/weather-forecast/services';
import {filter, map, tap} from 'rxjs';
import {Dictionary} from '@ngrx/entity';
import {DailyForecastActions, HourlyForecastActions, LocationReducer, TimeInterval} from '@bp/weather-forecast/domain';
import {Store} from '@ngrx/store';
import {locationId} from './forecast-locations.reducer';

@Injectable()
export class ForecastLocationsEffects {
	checkForSearch$ = createEffect(() => this._actions$.pipe(
		ofType(LocationActions.checkNotFoundQueriesThenSearch),
		filter(action => !!(action.cityNameQuery && action.timeInterval)),
		concatLatestFrom(({cityNameQuery}) => this._store.select(LocationSelectors.getInNotFoundCityNameQueries(cityNameQuery))),
		map(([{cityNameQuery, timeInterval}, isNotFoundCity]) => {
			if(isNotFoundCity){
				return LocationActions.notFoundQueryRepetition()
			}
			return LocationActions.search({cityNameQuery, timeInterval})
		})
	))

	search$ = createEffect(() => this._actions$.pipe(
		ofType(LocationActions.search),
		concatLatestFrom(({cityNameQuery}) => this._store.select(LocationSelectors.getLocationByQuery(cityNameQuery))),
		map(([action, locationEntity]) => {
			if (locationEntity) {
				return LocationActions.addForecast({locationEntity, timeInterval: action.timeInterval});
			} else {
				return LocationActions.loadLocationAndForecast({
					cityNameQuery: action.cityNameQuery,
					timeInterval: action.timeInterval
				});
			}
		})
	))

	loadLocationAndForecast$ = createEffect(() =>
		this._actions$.pipe(
			ofType(LocationActions.loadLocationAndForecast),
			fetch({
				run: action => {
					return this._weatherForecastApiService.getLocations(action.cityNameQuery)
						.pipe(
							map(locations => LocationActions.loadLocationSuccess({
								location: locations[0],
								cityNameQuery: action.cityNameQuery,
								timeInterval: action.timeInterval,
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

	loadLocationSuccess$ = createEffect(() => this._actions$.pipe(
		ofType(LocationActions.loadLocationSuccess),
		filter(({location}) => !!location),
		concatLatestFrom((action) =>
			this._store.select(LocationSelectors.getLocationEntityById(locationId(action.location)))
		),
		map(([action, locationEntity]) => LocationActions.addForecast({locationEntity, timeInterval: action.timeInterval}))
	))

	addForecast$ = createEffect(() => this._actions$.pipe(
		ofType(LocationActions.addForecast),
		filter(({locationEntity, timeInterval}) => !(locationEntity as Dictionary<any>)[timeInterval]),
		tap(({locationEntity, timeInterval}) => {
			if (timeInterval === TimeInterval.daily) {
				this._store.dispatch(DailyForecastActions.loadDailyForecast({location: locationEntity.location}))
			}
			if (timeInterval === TimeInterval.hourly) {
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
