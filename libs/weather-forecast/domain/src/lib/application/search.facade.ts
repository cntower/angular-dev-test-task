import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
	DailyForecastReducer,
	HourlyForecastReducer,
	MODE_NAME,
	QUERY_NAME,
	TimeInterval,
	DailyForecastActions,
	HourlyForecastActions,
	DailyForecastSelectors,
	HourlyForecastSelectors,
} from '@bp/weather-forecast/domain';
import {ParamMap} from '@angular/router';



@Injectable({providedIn: 'root'})
export class SearchFacade {
	readonly getDailyForecast$ = this._dailyForecastStore.select(DailyForecastSelectors.getDailyForecast);
	readonly getDailyForecastLoaded$ = this._dailyForecastStore.select(DailyForecastSelectors.getDailyForecastLoaded);
	readonly getDailyForecastCityNotFound$ = this._dailyForecastStore.select(DailyForecastSelectors.getDailyForecastCityNotFound);

	readonly getHourlyForecast$ = this._hourlyForecastStore.select(HourlyForecastSelectors.getHourlyForecast);
	readonly getHourlyForecastLoaded$ = this._hourlyForecastStore.select(HourlyForecastSelectors.getHourlyForecastLoaded);
	readonly getHourlyForecastCityNotFound$ = this._hourlyForecastStore.select(HourlyForecastSelectors.getHourlyForecastCityNotFound);

	constructor(
		private _dailyForecastStore: Store<DailyForecastReducer.DailyForecastPartialState>,
		private _hourlyForecastStore: Store<HourlyForecastReducer.HourlyForecastPartialState>,
	) {

	}

	search(params: ParamMap) {
		const query = params.get(QUERY_NAME);
		const mode = params.get(MODE_NAME);
		if (query && mode) {
			if (mode === TimeInterval.Daily) {
				console.log(mode, mode === TimeInterval.Daily);
				this._dailyForecastStore.dispatch(DailyForecastActions.loadDailyForecast({query}))
			}
			if (mode === TimeInterval.Hourly) {
				console.log(mode, mode === TimeInterval.Hourly);
				this._dailyForecastStore.dispatch(HourlyForecastActions.loadHourlyForecast({query}))
			}
		}
	}
}
