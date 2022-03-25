import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastTableComponent } from './forecast-table/forecast-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
	imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, MatProgressSpinnerModule],
	exports: [ForecastTableComponent],
	declarations: [ForecastTableComponent],
})
export class WeatherForecastUiForecastModule {}
