export interface ForecastItemViewModel {
	cityName: string;
	columns: ViewModelColumn[];
}

export interface ViewModelColumn{
	dt: number,
	temp: number,
}
