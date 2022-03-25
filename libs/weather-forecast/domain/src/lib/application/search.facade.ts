import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
	DailyForecastActions,
	ForecastItemViewModel,
	HourlyForecastActions,
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
import {Dictionary} from '@ngrx/entity';


@Injectable({providedIn: 'root'})
export class SearchFacade {
	readonly getLocationNoCityIsFound$ = this._store.select(LocationSelectors.getLocationNoCityIsFound);
	readonly getLocationDailyViewModel$: Observable<ForecastItemViewModel[]> = this._store.select(LocationSelectors.getLocationDailyViewModel);
	readonly getLocationHourlyViewModel$: Observable<ForecastItemViewModel[]> = this._store.select(LocationSelectors.getLocationHourlyViewModel);

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
					tap((locationEntity: LocationEntity) => {
						if (locationEntity) {
							this._addForecastByLocation(locationEntity, mode);
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
				tap((locationEntity: LocationEntity) => this._addForecastByLocation(locationEntity, mode)
				)
			).subscribe()
	}

	private _addForecastByLocation(locationEntity: LocationEntity, mode: string): void {
		if((locationEntity as Dictionary<any>)[mode]){
			return;
		}
		if (mode === TimeInterval.Daily.toString()) {
			this._store.dispatch(DailyForecastActions.loadDailyForecast({location: locationEntity.location}))
		}
		if (mode === TimeInterval.Hourly.toString()) {
			this._store.dispatch(HourlyForecastActions.loadHourlyForecast({location: locationEntity.location}))
		}
	}
}
