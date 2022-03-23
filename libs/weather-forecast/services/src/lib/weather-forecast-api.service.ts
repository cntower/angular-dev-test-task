import {Inject, Injectable} from '@angular/core';
import {API_KEY} from '../../../domain/src/lib/infrastructure/api-key.token';
import {BASE_URL} from '../../../domain/src/lib/infrastructure/base-url.token';
import {HttpClient} from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class WeatherForecastApiService {

	constructor(
		private _http: HttpClient,
		@Inject(API_KEY) private _apiKey: string,
		@Inject(BASE_URL) private _baseUrl: string,
	) {
	}

	getCoordinates(cityName: string){
		return this._http.get(this._getGetCoordinatesRequestUrl(cityName));
	}

	getHourlyForecast(lat: string, lon: string){
		return this._http.get(this._getGetHourlyForecastRequestUrl(lat, lon));
	}

	getDailyForecast(lat: string, lon: string){
		return this._http.get(this._getGetDailyForecastRequestUrl(lat, lon));
	}

	private _getGetCoordinatesRequestUrl(cityName: string): string {
		return `${this._baseUrl}/geo/1.0/direct?q=${cityName}&limit=1&appid=${this._apiKey}`;
	}

	private _getGetHourlyForecastRequestUrl(lat: string, lon: string): string {
		return `${this._baseUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily,alerts&appid=${this._apiKey}`;
	}

	private _getGetDailyForecastRequestUrl(lat: string, lon: string): string {
		return `${this._baseUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly,alerts&appid=${this._apiKey}`;
	}

}
