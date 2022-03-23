import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import {WeatherForecastFeatureSearchModule} from '@bp/weather-forecast/feature-search';
import {API_KEY} from '../../../../libs/weather-forecast/domain/src/lib/infrastructure/api-key.token';
import {BASE_URL} from '../../../../libs/weather-forecast/domain/src/lib/infrastructure/base-url.token';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MatButtonModule,
		StoreModule.forRoot(
			{},
			{
				metaReducers: !environment.production ? [] : [],
				runtimeChecks: {
					strictActionImmutability: true,
					strictStateImmutability: true,
				},
			}
		),
		EffectsModule.forRoot([]),
		!environment.production ? StoreDevtoolsModule.instrument() : [],
		WeatherForecastFeatureSearchModule,
	],
	providers: [
		{provide: API_KEY, useValue: environment.apiKey},
		{provide: BASE_URL, useValue: environment.baseUrl},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
