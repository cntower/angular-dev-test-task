import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
	DailyForecastActions,
	HourlyForecastActions,
	LocationActions,
	LocationDto,
	LocationReducer,
	LocationSelectors,
	MODE_NAME,
	QUERY_NAME,
	TimeInterval,
} from '@bp/weather-forecast/domain';
import {ParamMap} from '@angular/router';
import {filter, take, tap} from 'rxjs';
import {LocationEntity} from '../+state/location/location.models';


@Injectable({providedIn: 'root'})
export class SearchFacade {
	readonly getLocationNoCityIsFound$ = this._store.select(LocationSelectors.getLocationNoCityIsFound);
	readonly getLocationDailyViewModel$ = this._store.select(LocationSelectors.getLocationDailyViewModel);

	constructor(
		private _store: Store<LocationReducer.State>,
	) {

	}

	search(params: ParamMap) {
		const query = params.get(QUERY_NAME);
		const mode = params.get(MODE_NAME);
		if (query && mode) {
			this._store.select(LocationSelectors.getLocationByQuery, {cityName: query})
				.pipe(
					take(1),
					tap(locationEntity => {
						if (locationEntity) {
							this._loadForecastByLocation(locationEntity.location, mode);
						} else {
							this._store.dispatch(LocationActions.loadLocation({cityNameQuery: query}));
							this._loadForecastAfterLocation(query, mode);
						}
					})
				)
				.subscribe();
		}
	}

	private _loadForecastAfterLocation(query: string, mode: string): void {
		this._store.select(LocationSelectors.getLocationByQuery, {cityName: query})
			.pipe(
				filter((locationEntity: LocationEntity) => !!locationEntity),
				take(1),
				tap((locationEntity: LocationEntity) => this._loadForecastByLocation(locationEntity.location, mode)
				)
			).subscribe()
	}

	private _loadForecastByLocation(location: LocationDto, mode: string): void {
		if (mode === TimeInterval.Daily.toString()) {
			this._store.dispatch(DailyForecastActions.loadDailyForecast({location}))
		}
		if (mode === TimeInterval.Hourly.toString()) {
			this._store.dispatch(HourlyForecastActions.loadHourlyForecast({location}))
		}
	}
}
