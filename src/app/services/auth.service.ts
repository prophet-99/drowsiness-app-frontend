import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, Observable, catchError, tap, throwError } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthModel } from '../models/auth.model';
import { MessageModel } from '../models/message.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.API_BASE_URL}/auth`;
  private SESSION_STORAGE_NAME = 'DROWSINESS_AUTHORIZATION';
  private authorizationSubject = new BehaviorSubject<string>('');
  public authorization$ = this.authorizationSubject.asObservable();

  constructor(private httpClient: HttpClient) {}

  public loadCredentials(): void {
    const tokenAuthorization = this.getFromSessionStorage();
    if (this.getFromSessionStorage() !== '') {
      this.authorizationSubject.next(tokenAuthorization);
    }
  }

  public login(userRequest: AuthModel): Observable<MessageModel> {
    return this.httpClient.post<MessageModel>(this.baseUrl, userRequest).pipe(
      catchError<MessageModel, Observable<MessageModel>>((err) =>
        throwError(() => err)
      ),
      tap(() => {
        this.saveInSessionStorage(userRequest);
        this.authorizationSubject.next(this.getFromSessionStorage());
      })
    );
  }

  public logout(): void {
    this.deleteFromSessionStorage();
    this.authorizationSubject.next('');
  }

  // SESSION STORAGE METHODS
  public saveInSessionStorage(userAuth: AuthModel): void {
    sessionStorage.setItem(
      this.SESSION_STORAGE_NAME,
      btoa(`${userAuth.username}:${userAuth.password}`)
    );
  }

  public getFromSessionStorage(): string {
    return sessionStorage.getItem(this.SESSION_STORAGE_NAME) || '';
  }

  public deleteFromSessionStorage(): void {
    sessionStorage.removeItem(this.SESSION_STORAGE_NAME);
  }
}
