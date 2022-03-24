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

	TimeInterval = TimeInterval;

	searchForm = new FormGroup({
		cityNameQuery: new FormControl('', Validators.required),
		timeIntervalMode: new FormControl(TimeInterval.Hourly, Validators.required),
	})

	constructor(
		private _searchFacade: SearchFacade,
		private router: Router,
		private route: ActivatedRoute,
	) {
	}

	ngOnInit(): void {
		this._subscribeNavigationAfterFormChange();
		this._subscribeSearchAfterNavigation();
	}

	private _subscribeNavigationAfterFormChange() {
		this.searchForm.valueChanges
			.pipe(
				takeUntil(this._unsubscribe$),
				tap(form => {
					this.router.navigate([], {
						queryParams: {[MODE_NAME]: form.timeIntervalMode, [QUERY_NAME]: form.cityNameQuery},
						relativeTo: this.route,
					});
				})
			)
			.subscribe()
	}

	private _subscribeSearchAfterNavigation() {
		this.route.queryParamMap
			.pipe(
				takeUntil(this._unsubscribe$),
				tap((params: ParamMap) => this._searchFacade.search(params))
			)
			.subscribe()
	}

	ngOnDestroy(): void {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}
}
