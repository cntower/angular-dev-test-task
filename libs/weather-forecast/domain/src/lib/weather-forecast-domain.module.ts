import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DailyForecastEffects } from './+state/daily-forecast/daily-forecast.effects';
import { HourlyForecastEffects } from './+state/hourly-forecast/hourly-forecast.effects';
import * as fromLocation from './+state/forecast-locations/forecast-locations.reducer';
import { ForecastLocationsEffects } from './+state/forecast-locations/forecast-locations.effects';

@NgModule({
	imports: [
		CommonModule,
		EffectsModule.forFeature([DailyForecastEffects]),
		EffectsModule.forFeature([HourlyForecastEffects]),
		StoreModule.forFeature(fromLocation.LOCATION_FEATURE_KEY, fromLocation.reducer),
		EffectsModule.forFeature([ForecastLocationsEffects]),
	],
})
export class WeatherForecastDomainModule {}
