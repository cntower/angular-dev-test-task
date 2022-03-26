import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
	ForecastItemViewModel,
	LocationActions,
	LocationReducer,
	LocationSelectors,
	MODE_NAME,
	QUERY_NAME,
	TimeInterval,
} from '@bp/weather-forecast/domain';
import {ParamMap} from '@angular/router';
import {filter, Observable, take, tap} from 'rxjs';
import {LocationEntity} from '../+state/location/location.models';


@Injectable({providedIn: 'root'})
export class SearchFacade {
	readonly getLocationCityNotFound$ = this._store.select(LocationSelectors.getLocationCityNotFound);
	readonly getLocationDailyViewModel$: Observable<ForecastItemViewModel[]> = this._store.select(LocationSelectors.getLocationDailyViewModel);
	readonly getLocationHourlyViewModel$: Observable<ForecastItemViewModel[]> = this._store.select(LocationSelectors.getLocationHourlyViewModel);

	constructor(
		private _store: Store<LocationReducer.State>,
	) {

	}

	search(params: ParamMap) {
		const query = params.get(QUERY_NAME);
		const _mode = params.get(MODE_NAME);
		const mode: TimeInterval = TimeInterval[_mode as keyof typeof TimeInterval];
		if (query && mode) {
			this._store.select(LocationSelectors.getLocationByQuery, {cityName: query})
				.pipe(
					take(1),
					tap((locationEntity: LocationEntity) => {
						if (locationEntity) {
							this._store.dispatch(LocationActions.addForecast({locationEntity, mode}));
						} else {
							this._store.dispatch(LocationActions.loadLocation({cityNameQuery: query}));
							this._loadForecastAfterLocation(query, mode);
						}
					})
				)
				.subscribe();
		}
	}

	private _loadForecastAfterLocation(query: string, mode: TimeInterval): void {
		this._store.select(LocationSelectors.getLocationByQuery, {cityName: query})
			.pipe(
				filter((locationEntity: LocationEntity) => !!locationEntity),
				take(1),
				tap((locationEntity: LocationEntity) => this._store.dispatch(LocationActions.addForecast({
					locationEntity,
					mode
				}))
				)
			).subscribe()
	}
}
