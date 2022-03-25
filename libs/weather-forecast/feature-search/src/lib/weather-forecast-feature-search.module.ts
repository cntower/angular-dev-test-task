import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {WeatherForecastDomainModule} from '@bp/weather-forecast/domain';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {WeatherForecastUiForecastModule} from '@bp/weather-forecast/ui-forecast';

@NgModule({
	imports: [
		CommonModule,
		WeatherForecastDomainModule,
		ReactiveFormsModule,
		MatInputModule,
		MatRadioModule,
		MatButtonModule,
		WeatherForecastUiForecastModule,
	],
	declarations: [
		SearchComponent
	],
	exports:[
		SearchComponent
	]
})
export class WeatherForecastFeatureSearchModule {}
