import {TimeInterval} from '@bp/weather-forecast/domain';

export interface SearchForm {
	timeInterval: TimeInterval;
	cityNameQuery: string;
}
