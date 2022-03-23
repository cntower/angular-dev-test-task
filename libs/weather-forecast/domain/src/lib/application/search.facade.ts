import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {dailyForecastReducer, hourlyForecastReducer} from '@bp/weather-forecast/domain';
import {WeatherForecastApiService} from '@bp/weather-forecast/services';


@Injectable({providedIn: 'root'})
export class SearchFacade {
	test = 'test';

	constructor(
		private _dailyForecastStore: Store<dailyForecastReducer.DailyForecastPartialState>,
		private _hourlyForecastStore: Store<hourlyForecastReducer.HourlyForecastPartialState>,
		private weatherForecastApiService: WeatherForecastApiService,
	) {
		console.log(this.weatherForecastApiService.apiKey, 'apiKey');
		console.log(this._dailyForecastStore, this._hourlyForecastStore);
	}

}
