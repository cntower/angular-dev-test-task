import {WeatherItem} from './weather-item';

export interface ForecastItemBaseDto {
	dt: number;
	pressure: number;
	humidity: number;
	dew_point: number;
	wind_speed: number;
	wind_deg: number;
	wind_gust: number;
	weather: WeatherItem[];
	clouds: number;
	pop: number;
	uvi: number;
}
