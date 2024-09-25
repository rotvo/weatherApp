
export interface ApiResponse<T> {
  page:    number;
  limit:   number;
  total:   number;
  items:   T[]; 
}

export interface Flight {
  id:                    number;
  origin:                string;
  destination:           string;
  airline:               string;
  flight_num:            number;
  origin_iata_code:      string;
  origin_name:           string;
  origin_latitude:       number;
  origin_longitude:      number;
  destination_iata_code: string;
  destination_name:      string;
  destination_latitude:  number;
  destination_longitude: number;
  originWeather:         NWeather;
  destinationWeather:    NWeather;
}

export interface SearchFilters {
  id?: string;
  origin?: string;
  destination?: string;
}

export interface NWeather {
  coord:      Coord;
  weather:    Weather[];
  base:       string;
  main:       Main;
  visibility: number;
  wind:       Wind;
  rain:       Rain;
  clouds:     Clouds;
  dt:         number;
  sys:        Sys;
  timezone:   number;
  id:         number;
  name:       string;
  cod:        number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp:       number;
  feels_like: number;
  temp_min:   number;
  temp_max:   number;
  pressure:   number;
  humidity:   number;
  sea_level:  number;
  grnd_level: number;
}

export interface Rain {
  "1h": number;
}

export interface Sys {
  type:    number;
  id:      number;
  country: string;
  sunrise: number;
  sunset:  number;
}

export interface Weather {
  id:          number;
  main:        string;
  description: string;
  icon:        string;
}

export interface WeatherElement {
  id:          number;
  main:        string;
  description: string;
  icon:        string;
}

export interface Wind {
  speed: number;
  deg:   number;
}

