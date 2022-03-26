import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SearchForm, TimeInterval} from '@bp/weather-forecast/domain';
import {Observable, Subject, takeUntil, tap} from 'rxjs';


@Component({
	selector: 'bp-search-form',
	templateUrl: './search-form.component.html',
	styleUrls: ['./search-form.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchFormComponent implements OnInit, OnDestroy{
	private _unsubscribe$ = new Subject<void>();

	private _query?: string;

	@Input()
	set query(value: string) {
		this._query = value;
		this.searchForm?.get('cityNameQuery')?.setValue(value);
	}

	private _mode?: TimeInterval;

	@Input()
	set mode(value: TimeInterval) {
		this._mode = value;
		this.searchForm?.get('timeInterval')?.setValue(value);
	}

	@Input() getIsAnyLoading$?: Observable<boolean | undefined>;

	@Output() formSubmit = new EventEmitter<SearchForm>();

	@Output() timeIntervalChanged = new EventEmitter<TimeInterval>();

	TimeInterval = TimeInterval;

	searchForm?: FormGroup;

	ngOnInit(): void {
		this._setSearchForm(this._query, this._mode);
		this._subscribeToFormChange();
	}

	ngOnDestroy(): void {
		this._unsubscribe$.next();
		this._unsubscribe$.complete();
	}

	onSubmit(form: SearchForm) {
		this.formSubmit.emit(form)
	}

	private _setSearchForm(query = '', mode = TimeInterval.hourly) {
		this.searchForm = new FormGroup({
			cityNameQuery: new FormControl(query, Validators.required),
			timeInterval: new FormControl(mode, Validators.required),
		})
	}

	private _subscribeToFormChange() {
		this.searchForm?.get('timeInterval')?.valueChanges
			.pipe(
				takeUntil(this._unsubscribe$),
				tap((timeInterval: TimeInterval) => {
					this.timeIntervalChanged.emit(timeInterval);
				})
			)
			.subscribe()
	}

}
