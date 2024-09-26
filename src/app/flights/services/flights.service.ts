import { Injectable } from '@angular/core';
import { ApiResponse, Flight, NWeather, Weather } from '../interface/flight';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlightsService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

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
