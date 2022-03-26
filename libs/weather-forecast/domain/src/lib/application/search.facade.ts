import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
	ForecastItemViewModel,
	LocationActions,
	LocationReducer,
	LocationSelectors,
	TimeInterval,
} from '@bp/weather-forecast/domain';
import {Observable, take, tap} from 'rxjs';
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

	search(cityNameQuery: string, timeInterval: TimeInterval) {
		if (cityNameQuery && timeInterval) {
			this._store.select(LocationSelectors.getLocationByQuery, {cityNameQuery})
				.pipe(
					take(1),
					tap((locationEntity: LocationEntity) => {
						if (locationEntity) {
							this._store.dispatch(LocationActions.addForecast({locationEntity, timeInterval}));
						} else {
							this._store.dispatch(LocationActions.loadLocationAndForecast({cityNameQuery, timeInterval}));
						}
					})
				)
				.subscribe();
		}
	}
}
