import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import {WeatherForecastDomainModule} from '@bp/weather-forecast/domain';

@NgModule({
	imports: [
		CommonModule,
		WeatherForecastDomainModule,
	],
	declarations: [
		SearchComponent
	],
	exports:[
		SearchComponent
	]
})
export class WeatherForecastFeatureSearchModule {}
