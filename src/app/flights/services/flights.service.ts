import { Injectable } from '@angular/core';
import { ApiResponse, Flight, NWeather, Weather } from '../interface/flight';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }
  
  // getWeatherByCoordinates(latitude: number , longitude: number): Observable<NWeather> {
  //   const url = `${this.apiUrl}/weather/getByCoordinates?latitude=${latitude}&longitude=${longitude}`;
  //   return this.http.get<NWeather>(url);
  // }

  getWeatherReport(page:number, pageSize:number) : Observable<ApiResponse<Flight>> {
    const url = `${this.apiUrl}/flights/getWeatherReport?page=${page}&pageSize=${pageSize}`;
    return this.http.get<ApiResponse<Flight>>(url);
  }
  //consume a post api to clear cache
  deleteCache(): Observable<{message:string}> {
    const url = `${this.apiUrl}/cache/clear`;
    return this.http.post<{message:string}>(url, {});
  }
}
