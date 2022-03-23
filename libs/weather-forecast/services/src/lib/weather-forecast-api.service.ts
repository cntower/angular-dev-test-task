import {Inject, Injectable} from '@angular/core';
import {API_KEY} from '../../../domain/src/lib/infrastructure/api-kye.token';

@Injectable({providedIn: 'root'})
export class WeatherForecastApiService {
	constructor(@Inject(API_KEY) public apiKey: string) {

	}

	// private _apiKey = '010721642521f31b0fbc8c3831d45951';

}
