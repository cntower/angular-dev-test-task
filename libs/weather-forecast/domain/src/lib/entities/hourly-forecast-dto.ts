import {ForecastBaseDto} from './forecast-base-dto';
import {ForecastItemBaseDto} from './forecast-item-base-dto';

export interface HourlyForecastDto extends ForecastBaseDto {
	hourly: HourlyForecastHourlyItem[];
}

interface HourlyForecastHourlyItem extends ForecastItemBaseDto{
	temp: number;
	feels_like: number;
	visibility: number;
}
