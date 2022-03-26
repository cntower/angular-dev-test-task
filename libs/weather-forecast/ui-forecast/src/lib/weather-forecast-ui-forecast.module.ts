import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ForecastTableComponent} from './forecast-table/forecast-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {SearchFormComponent} from './search-form/search-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {WeatherForecastDomainModule} from '@bp/weather-forecast/domain';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
	imports: [
		CommonModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatProgressSpinnerModule,
		ReactiveFormsModule,
		MatInputModule,
		MatRadioModule,
		WeatherForecastDomainModule,
		MatButtonModule,
	],
	exports: [ForecastTableComponent, SearchFormComponent],
	declarations: [ForecastTableComponent, SearchFormComponent],
})
export class WeatherForecastUiForecastModule {
}
