import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {dailyForecastReducer, hourlyForecastReducer} from '@bp/weather-forecast/domain';
import {WeatherForecastApiService} from '@bp/weather-forecast/services';
import {map, switchMap, tap} from 'rxjs';


@Injectable({providedIn: 'root'})
export class SearchFacade {
	test = 'test';

	constructor(
		private _dailyForecastStore: Store<dailyForecastReducer.DailyForecastPartialState>,
		private _hourlyForecastStore: Store<hourlyForecastReducer.HourlyForecastPartialState>,
		private weatherForecastApiService: WeatherForecastApiService,
	) {
		this.weatherForecastApiService.getLocales('London')
			.pipe(
				tap(locales => console.log(locales[0].country)),
				map(locales=>locales[0]),
				switchMap(locale=>this.weatherForecastApiService.getHourlyForecast(locale.lat, locale.lon)),
				tap(console.log),
			)
			.subscribe()
		;
		// console.log(this.weatherForecastApiService.apiKey, 'apiKey');
		console.log(this._dailyForecastStore, this._hourlyForecastStore);
	}
}
