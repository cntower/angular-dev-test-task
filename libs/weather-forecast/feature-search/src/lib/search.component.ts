import {Component, OnDestroy, OnInit} from '@angular/core';
import {SearchFacade} from '../../../domain/src/lib/application/search.facade';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MODE_NAME, QUERY_NAME, TimeInterval} from '@bp/weather-forecast/domain';
import {Subject, takeUntil, tap} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';

@Component({
	selector: 'bp-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
	private _unsubscribe$ = new Subject<void>();

	readonly getLocationCityNotFound$ = this._searchFacade.getLocationCityNotFound$;
	readonly getLocationDailyViewModels$ = this._searchFacade.getLocationDailyViewModel$;
	readonly getLocationHourlyViewModel$ = this._searchFacade.getLocationHourlyViewModel$;

	TimeInterval = TimeInterval;

	searchForm?: FormGroup;

	constructor(
		private _searchFacade: SearchFacade,
		private _router: Router,
		private _route: ActivatedRoute,
	) {
	}

	ngOnInit(): void {
		this._setSearchForm();
		this._subscribeToQueryParams();
		this._subscribeToFormChange();
	}

	private _subscribeToFormChange() {
		this.searchForm?.get('timeIntervalMode')?.valueChanges
			.pipe(
				takeUntil(this._unsubscribe$),
				tap(timeIntervalMode => {
					this._navigateByMode(timeIntervalMode);
				})
			)
			.subscribe()
	}

	private _navigateByMode(timeIntervalMode: TimeInterval) {
		this._router.navigate([], {
			queryParams: {[MODE_NAME]: timeIntervalMode},
			relativeTo: this._route,
			queryParamsHandling: 'merge',
		});
	}

	onSubmit(form: { timeIntervalMode: string; cityNameQuery: string }) {
		if (!this.searchForm?.valid) {
			return;
		}
		this._router.navigate([], {
			queryParams: {[MODE_NAME]: form.timeIntervalMode, [QUERY_NAME]: form.cityNameQuery},
			relativeTo: this._route,
		});
	}

	private _subscribeToQueryParams() {
		this._route.queryParamMap
			.pipe(
				takeUntil(this._unsubscribe$),
				tap((params: ParamMap) => {
					this._updateFormWithQueryParams(params);
					this._search(params);
				})
			)
			.subscribe()
	}

	private _updateFormWithQueryParams(params: ParamMap) {
		this.searchForm?.get('cityNameQuery')?.setValue(params.get(QUERY_NAME));
		this.searchForm?.get('timeIntervalMode')?.setValue(params.get(MODE_NAME));
	}

	private _search(params: ParamMap) {
		const cityNameQuery = params.get(QUERY_NAME) || '';
		const timeIntervalQuery = params.get(MODE_NAME);
		const timeInterval: TimeInterval = TimeInterval[timeIntervalQuery as keyof typeof TimeInterval];
		this._searchFacade.search(cityNameQuery, timeInterval);
	}

	private _setSearchForm(query = '', mode = TimeInterval.hourly) {
		this.searchForm = new FormGroup({
			cityNameQuery: new FormControl(query, Validators.required),
			timeIntervalMode: new FormControl(mode, Validators.required),
		})
	}

	ngOnDestroy(): void {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

}
