import {LocationDto} from '../../entities/location-dto';
import {DailyForecastDto} from '../../entities/daily-forecast-dto';
import {HourlyForecastDto} from '../../entities/hourly-forecast-dto';

export interface LocationEntity {
	location: LocationDto;
	cityNameQueries: { [key: string]: boolean };
	daily?: DailyForecastDto;
	hourly?: HourlyForecastDto;
}
