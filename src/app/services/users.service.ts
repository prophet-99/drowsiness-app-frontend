import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, shareReplay, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { UserModel } from '../models/user.model';
import { UserRequest } from '../models/request/user.request';
import { MessageModel } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private baseUrl = `${environment.API_BASE_URL}/users`;
  private SESSION_STORAGE_NAME = 'DROWSINESS_TEMPORAL_USER';

  constructor(private httpClient: HttpClient) {}

  public getAll(areActive: boolean, searchParam = ''): Observable<UserModel[]> {
    return this.httpClient
      .get<UserModel[]>(
        `${this.baseUrl}/active/${areActive}?search=${searchParam}`
      )
      .pipe(shareReplay());
  }

  public save(userRequest: UserRequest): Observable<UserModel | MessageModel> {
    return this.httpClient
      .post<UserModel>(this.baseUrl, userRequest)
      .pipe(
        catchError<UserModel, Observable<MessageModel>>((err) =>
          throwError(() => err)
        )
      );
  }

  public savePhoto(dni: string, file: File): Observable<MessageModel> {
    const formData = new FormData();
    formData.append('file', file);

    return this.httpClient
      .post<MessageModel>(`${this.baseUrl}/${dni}/photo`, formData)
      .pipe(
        catchError<MessageModel, Observable<MessageModel>>((err) =>
          throwError(() => err)
        )
      );
  }

  public update(
    userRequest: UserRequest
  ): Observable<UserModel | MessageModel> {
    return this.httpClient
      .put<UserModel>(this.baseUrl, userRequest)
      .pipe(
        catchError<UserModel, Observable<MessageModel>>((err) =>
          throwError(() => err)
        )
      );
  }

  public delete(dni: string): Observable<MessageModel> {
    return this.httpClient
      .delete<MessageModel>(`${this.baseUrl}/dni/${dni}`)
      .pipe(
        catchError<MessageModel, Observable<MessageModel>>((err) =>
          throwError(() => err)
        )
      );
  }

  // SESSION STORAGE METHODS
  public saveInSessionStorage(user: UserModel): void {
    sessionStorage.setItem(this.SESSION_STORAGE_NAME, JSON.stringify(user));
  }

  public getFromSessionStorage(): UserModel {
    let parsedUser;
    try {
      parsedUser = JSON.parse(
        sessionStorage.getItem('DROWSINESS_TEMPORAL_USER') || ''
      );
    } catch (err) {
      /* empty */
    }
    return parsedUser;
  }

  public deleteFromSessionStorage(): void {
    sessionStorage.removeItem('DROWSINESS_TEMPORAL_USER');
  }
}
