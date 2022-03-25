export interface DailyViewModel {
	cityName: string;
	daily:{
		dt: number,
		temp: number,
	}[]
}
