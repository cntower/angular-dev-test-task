import {Injectable} from '@angular/core';
import {Store} from '@ngrx/store';
import {
	dailyForecastReducer,
	hourlyForecastReducer,
	MODE_NAME,
	QUERY_NAME,
	TimeInterval,
	DailyForecastActions,
	HourlyForecastActions,
} from '@bp/weather-forecast/domain';
import {WeatherForecastApiService} from '@bp/weather-forecast/services';
import {map, switchMap, tap} from 'rxjs';
import {ParamMap} from '@angular/router';


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
				map(locales => locales[0]),
				switchMap(locale => this.weatherForecastApiService.getHourlyForecast(locale.lat, locale.lon)),
				tap(console.log),
			)
			.subscribe()
		;
		// console.log(this.weatherForecastApiService.apiKey, 'apiKey');
		console.log(this._dailyForecastStore, this._hourlyForecastStore);
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
