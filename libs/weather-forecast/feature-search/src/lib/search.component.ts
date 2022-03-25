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

	readonly getLocationNoCityIsFound$ = this._searchFacade.getLocationNoCityIsFound$;
	readonly getLocationDailyViewModel$ = this._searchFacade.getLocationDailyViewModel$;
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
		this._setForm();
		this._subscribeSearchAfterNavigation();
		this._subscribeNavigationAfterFormChange();
	}

	private _subscribeNavigationAfterFormChange() {
		this.searchForm?.valueChanges
			.pipe(
				takeUntil(this._unsubscribe$),
				tap(form => {
					this._router.navigate([], {
						queryParams: {[MODE_NAME]: form.timeIntervalMode, [QUERY_NAME]: form.cityNameQuery},
						relativeTo: this._route,
					});
				})
			)
			.subscribe()
	}

	private _subscribeSearchAfterNavigation() {
		this._route.queryParamMap
			.pipe(
				takeUntil(this._unsubscribe$),
				tap((params: ParamMap) => {
					this.searchForm?.get('cityNameQuery')?.setValue(params.get(QUERY_NAME));
					this.searchForm?.get('timeIntervalMode')?.setValue(params.get(MODE_NAME));
				}),
				tap((params: ParamMap) => this._searchFacade.search(params))
			)
			.subscribe()
	}

	private _setForm(query = '', mode = TimeInterval.Hourly) {
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
