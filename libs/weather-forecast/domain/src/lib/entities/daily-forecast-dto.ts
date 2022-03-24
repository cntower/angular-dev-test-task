import {ForecastBaseDto} from './forecast-base-dto';
import {ForecastItemBaseDto} from './forecast-item-base-dto';

export interface DailyForecastDto extends ForecastBaseDto{
	daily: DailyForecastDailyItem[];
}

interface DailyForecastDailyItem extends ForecastItemBaseDto{
	sunrise: number;
	sunset: number;
	moonrise: number;
	moonset: number;
	moon_phase: number;
	temp: Temp;
	feels_like: FeelsLike;
}

interface Temp {
	day: number;
	min: number;
	max: number;
	night: number;
	eve: number;
	morn: number;
}

interface FeelsLike {
	day: number;
	night: number;
	eve: number;
	morn: number;
}
