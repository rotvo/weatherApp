import { FlightsService } from './../../services/flights.service';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatTableDataSource } from '@angular/material/table'; 
import { Flight, NWeather, SearchFilters, Weather } from '../../interface/flight';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { ChangeDetectorRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { LoadingSpinnerComponent } from '../../../shared/components/loading-spinner/loading-spinner.component';




@Component({
  selector: 'app-flight',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatButtonModule,
    LoadingSpinnerComponent
],
  templateUrl: './flight.component.html',
  styleUrl: './flight.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FlightComponent implements OnInit { 
  displayedColumns: string[] = [ 'flight_num', 'airline', 'origin','destination', 'originWeather','destinationWeather',  'actions'];
  dataSource = new MatTableDataSource<Flight>();
  totalRecords: number = 0;
  pageSize:number = 10;
  loading: boolean = false;
  weatherOrigin: NWeather = {
    coord: {
      lon: 0,
      lat: 0
    },
    weather: [] || null || undefined,
    base: '',
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
      grnd_level: 0
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0
    },
    rain: {
      '1h': 0
    },
    clouds: {
      all: 0
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      country: '',
      sunrise: 0,
      sunset: 0
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0
  };
  weatherDestination: NWeather = {
    coord: {
      lon: 0,
      lat: 0
    },
    weather: [
      {
        id: 0,
        main: '',
        description: '',
        icon: ''
      }
    ],
    base: '',
    main: {
      temp: 0,
      feels_like: 0,
      temp_min: 0,
      temp_max: 0,
      pressure: 0,
      humidity: 0,
      sea_level: 0,
      grnd_level: 0
    },
    visibility: 0,
    wind: {
      speed: 0,
      deg: 0
    },
    rain: {
      '1h': 0
    },
    clouds: {
      all: 0
    },
    dt: 0,
    sys: {
      type: 0,
      id: 0,
      country: '',
      sunrise: 0,
      sunset: 0
    },
    timezone: 0,
    id: 0,
    name: '',
    cod: 0
  };
  filters : SearchFilters = {
    origin: '',
    destination: ''
  };

  @ViewChild(MatPaginator, {}) paginator!: MatPaginator;
  constructor(private FlightsService: FlightsService, private cdr: ChangeDetectorRef) {}
  ngAfterViewInit() {
    
  }
  onPageChanged(e: PageEvent): void {
    this.getAllFlights();
  }  

  getAllFlights(): void {
    const page = this.paginator ? this.paginator.pageIndex + 1 : 1,
    pageSize = this.paginator ? this.paginator.pageSize : this.pageSize;
    this.FlightsService.getWeatherReport(page, pageSize).subscribe({
      next: (data) => {
        console.log(data);
        this.dataSource.data = data.items || [];
        this.totalRecords = data.total || 0;
      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.log('complete');
        this.loading = false;
        this.cdr.detectChanges();
    }
    });
  }

  viewDetails(element: Flight ): void {
    this.weatherOrigin.name = element.originWeather.name;
    this.weatherOrigin.coord = element.originWeather.coord;
    this.weatherOrigin.weather = element.originWeather.weather;
    this.weatherOrigin.base = element.originWeather.base;
    this.weatherOrigin.main = element.originWeather.main;
    this.weatherOrigin.visibility = element.originWeather.visibility;

    this.weatherDestination.name = element.destinationWeather.name;
    this.weatherDestination.coord = element.destinationWeather.coord;
    this.weatherDestination.weather = element.destinationWeather.weather;
    this.weatherDestination.base = element.destinationWeather.base;
    this.weatherDestination.main = element.destinationWeather.main;
    this.weatherDestination.visibility = element.destinationWeather.visibility;

  }
  

  ngOnInit(): void {
    this.getAllFlights();
  }

  getWeatherReport(): void {
    this.loading = true;
    this.cdr.markForCheck();
    const page = this.paginator ? this.paginator.pageIndex + 1 : 1,
    pageSize = this.paginator ? this.paginator.pageSize : this.pageSize;

    this.FlightsService.getWeatherReport(page, pageSize).subscribe({
      next: (data) => {
        this.dataSource.data = data.items || [];
        this.totalRecords = data.total || 0;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
        this.cdr.markForCheck();
      },
      complete: () => {
        console.log('complete');
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
    
  }

  deleteCache(): void {
    this.FlightsService.deleteCache().subscribe({
      next: (data) => {
        console.log(data);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
}
