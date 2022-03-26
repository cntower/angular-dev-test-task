import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {ForecastItemViewModel, ViewModelColumn} from '@bp/weather-forecast/domain';
import {Observable} from 'rxjs';

@Component({
	selector: 'bp-forecast-table',
	templateUrl: './forecast-table.component.html',
	styleUrls: ['./forecast-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForecastTableComponent {

	@Input()
	set viewModels(value: ForecastItemViewModel[] | null) {
		if (!value) {
			return;
		}
		this.columns = value[0]?.columns;
		if (this.columns?.length) {
			this._produceDisplayedColumns(this.columns.length);
		}
		this.dataSource.data = value;
	};

	@Input() headerDatePipeFormat = '';

	@Input() isDataLoading$?: Observable<boolean | undefined>;

	columns: ViewModelColumn[] = [];

	dataSource = new MatTableDataSource<ForecastItemViewModel>([]);

	displayedColumns = [
		'cityName'
	];

	private _produceDisplayedColumns(length: number) {
		this.displayedColumns = ['cityName'];
		for (let i = 0; i < length; i++) {
			this.displayedColumns.push(`col-n-${i}`)
		}
	}
}
