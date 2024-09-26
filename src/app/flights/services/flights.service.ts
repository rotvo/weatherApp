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
    // Verifica si estás en localhost o en producción
    if (window.location.hostname === 'localhost') {
      this.apiUrl = 'http://localhost:3000/api'; 
    } else {
      this.apiUrl = 'https://weather-backend-livid.vercel.app/api';
    }
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
