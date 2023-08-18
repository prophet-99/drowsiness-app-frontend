import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, shareReplay } from 'rxjs';

import { environment } from '../../environments/environment';
import { StatisticsModel } from '../models/statistics.model';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private baseUrl = `${environment.API_BASE_URL}/statistics`;

  constructor(private httpClient: HttpClient) {}

  public getAll(searchParam = ''): Observable<StatisticsModel[]> {
    return this.httpClient
      .get<StatisticsModel[]>(`${this.baseUrl}?search=${searchParam}`)
      .pipe(shareReplay());
  }
}
