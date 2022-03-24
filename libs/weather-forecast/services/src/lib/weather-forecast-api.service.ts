import {Inject, Injectable} from '@angular/core';
import {API_KEY, BASE_URL, LocalesItemDto} from '@bp/weather-forecast/domain';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DailyForecastDto} from '@bp/weather-forecast/domain';
import {HourlyForecastDto} from '@bp/weather-forecast/domain';

@Injectable({providedIn: 'root'})
export class WeatherForecastApiService {

	constructor(
		private _http: HttpClient,
		@Inject(API_KEY) private _apiKey: string,
		@Inject(BASE_URL) private _baseUrl: string,
	) {
	}

	getLocales(cityName: string):Observable<LocalesItemDto[]>{
		return this._http.get<LocalesItemDto[]>(this._getGetLocalesRequestUrl(cityName));
	}

	getHourlyForecast(lat: number, lon: number):Observable<HourlyForecastDto>{
		return this._http.get<HourlyForecastDto>(this._getGetHourlyForecastRequestUrl(lat, lon));
	}

	getDailyForecast(lat: number, lon: number):Observable<DailyForecastDto>{
		return this._http.get<DailyForecastDto>(this._getGetDailyForecastRequestUrl(lat, lon));
	}

	private _getGetLocalesRequestUrl(cityName: string): string {
		return `${this._baseUrl}/geo/1.0/direct?q=${cityName}&limit=1&appid=${this._apiKey}`;
	}

	private _getGetHourlyForecastRequestUrl(lat: number, lon: number): string {
		return `${this._baseUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${this._apiKey}`;
	}

	private _getGetDailyForecastRequestUrl(lat: number, lon: number): string {
		return `${this._baseUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${this._apiKey}`;
	}

}
