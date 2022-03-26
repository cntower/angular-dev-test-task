import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
	ForecastItemViewModel,
	LocationActions,
	LocationReducer,
	LocationSelectors,
	TimeInterval,
} from '@bp/weather-forecast/domain';
import {Observable} from 'rxjs';


@Injectable({providedIn: 'root'})
export class SearchFacade {
	readonly getLocationCityNotFound$ = this._store.select(LocationSelectors.getLocationCityNotFound);
	readonly getLocationDailyViewModel$: Observable<ForecastItemViewModel[]> = this._store.select(LocationSelectors.getLocationDailyViewModel);
	readonly getLocationHourlyViewModel$: Observable<ForecastItemViewModel[]> = this._store.select(LocationSelectors.getLocationHourlyViewModel);
	readonly getIsDailyForecastLoading$: Observable<boolean | undefined> = this._store.select(LocationSelectors.getIsDailyForecastLoading);
	readonly getIsHourlyForecastLoading$: Observable<boolean | undefined> = this._store.select(LocationSelectors.getIsHourlyForecastLoading);
	readonly getIsAnyLoading$: Observable<boolean | undefined> = this._store.select(LocationSelectors.getIsAnyLoading);

	constructor(
		private readonly _store: Store<LocationReducer.State>,
	) {
	}

	search(cityNameQuery: string, timeInterval: TimeInterval) {
		this._store.dispatch(LocationActions.checkNotFoundQueriesThenSearch({cityNameQuery, timeInterval}));
	}
}
