import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {hourlyForecastReducer, dailyForecastReducer} from '@bp/weather-forecast/domain';


@Injectable({providedIn: 'root'})
export class SearchFacade {
	test = 'test';

	constructor(
		private _dailyForecastStore: Store<dailyForecastReducer.DailyForecastPartialState>,
		private _hourlyForecastStore: Store<hourlyForecastReducer.HourlyForecastPartialState>,
	) {
		console.log(this._dailyForecastStore, this._hourlyForecastStore);
	}

}
