import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DailyForecastEffects } from './+state/daily-forecast/daily-forecast.effects';
import { HourlyForecastEffects } from './+state/hourly-forecast/hourly-forecast.effects';
import * as fromLocation from './+state/location/location.reducer';
import { LocationEffects } from './+state/location/location.effects';

@NgModule({
	imports: [
		CommonModule,
		EffectsModule.forFeature([DailyForecastEffects]),
		EffectsModule.forFeature([HourlyForecastEffects]),
		StoreModule.forFeature(fromLocation.LOCATION_FEATURE_KEY, fromLocation.reducer),
		EffectsModule.forFeature([LocationEffects]),
	],
})
export class WeatherForecastDomainModule {}
