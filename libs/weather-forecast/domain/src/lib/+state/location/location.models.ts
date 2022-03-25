import {LocationDto} from '../../entities/location-dto';
import {DailyForecastDto} from '../../entities/daily-forecast-dto';
import {HourlyForecastDto} from '../../entities/hourly-forecast-dto';

export interface LocationEntity {
	// id: string | number; // Primary ID
	// name: string;
	location: LocationDto;
	cityNameQueries: { [key: string]: boolean };
	daily?: DailyForecastDto;
	hourly?: HourlyForecastDto;
}
