export interface HourlyViewModel {
	cityName: string;
	hourly?:{
		dt: number,
		temp: number,
	}[]
}
