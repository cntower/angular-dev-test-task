import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromDailyForecast from './+state/daily-forecast/daily-forecast.reducer';
import { DailyForecastEffects } from './+state/daily-forecast/daily-forecast.effects';
import * as fromHourlyForecast from './+state/hourly-forecast/hourly-forecast.reducer';
import { HourlyForecastEffects } from './+state/hourly-forecast/hourly-forecast.effects';

@NgModule({
	imports: [
		CommonModule,
		StoreModule.forFeature(fromDailyForecast.DAILY_FORECAST_FEATURE_KEY, fromDailyForecast.reducer),
		EffectsModule.forFeature([DailyForecastEffects]),
		StoreModule.forFeature(fromHourlyForecast.HOURLY_FORECAST_FEATURE_KEY, fromHourlyForecast.reducer),
		EffectsModule.forFeature([HourlyForecastEffects]),
	],
})
export class WeatherForecastDomainModule {}
