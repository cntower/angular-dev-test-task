import {Component, OnDestroy, OnInit} from '@angular/core';
import {MODE_NAME, QUERY_NAME, SearchFacade, SearchForm, TimeInterval} from '@bp/weather-forecast/domain';
import {Subject, takeUntil, tap} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
	selector: 'bp-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
	private _unsubscribe$ = new Subject<void>();

	readonly getLocationError$ = this._searchFacade.getLocationError$;
	readonly getLocationCityNotFound$ = this._searchFacade.getLocationCityNotFound$;
	readonly getLocationDailyViewModels$ = this._searchFacade.getLocationDailyViewModel$;
	readonly getLocationHourlyViewModel$ = this._searchFacade.getLocationHourlyViewModel$;
	readonly getIsAnyLoading$ = this._searchFacade.getIsAnyLoading$;
	readonly getIsDailyForecastLoading$ = this._searchFacade.getIsDailyForecastLoading$;
	readonly getIsHourlyForecastLoading$ = this._searchFacade.getIsHourlyForecastLoading$;

	readonly TimeInterval = TimeInterval;

	cityNameQuery = '';
	timeIntervalMode = TimeInterval.daily;

	constructor(
		private readonly _searchFacade: SearchFacade,
		private readonly _router: Router,
		private readonly _route: ActivatedRoute,
	) {
	}

	ngOnInit(): void {
		this._subscribeToQueryParams();
	}

	onTimeIntervalChanged(timeInterval: TimeInterval) {
		this._navigateByTimeInterval(timeInterval);
	}

	private _navigateByTimeInterval(timeInterval: TimeInterval) {
		this._router.navigate([], {
			queryParams: {[MODE_NAME]: timeInterval},
			relativeTo: this._route,
			queryParamsHandling: 'merge',
		});
	}

	onSubmit(form: SearchForm) {
		this._router.navigate([], {
			queryParams: {[MODE_NAME]: form.timeInterval, [QUERY_NAME]: form.cityNameQuery},
			relativeTo: this._route,
		});
	}

	private _subscribeToQueryParams() {
		this._route.queryParamMap
			.pipe(
				takeUntil(this._unsubscribe$),
				tap((params: ParamMap) => {
					this._updateFormWithQueryParams(params);
					this._searchFacade.search(this.cityNameQuery, this.timeIntervalMode);
				})
			)
			.subscribe();
	}

	private _updateFormWithQueryParams(params: ParamMap) {
		this.cityNameQuery = params.get(QUERY_NAME) || '';
		const timeIntervalQuery = params.get(MODE_NAME);
		this.timeIntervalMode = TimeInterval[timeIntervalQuery as keyof typeof TimeInterval];
	}

	ngOnDestroy(): void {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

}
