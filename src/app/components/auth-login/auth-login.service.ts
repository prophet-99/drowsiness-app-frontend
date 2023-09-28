import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthLoginService {
  private authLoginSubject = new BehaviorSubject<boolean>(false);
  public authLogin$ = this.authLoginSubject.asObservable();

  public showAuthLogin(): void {
    this.authLoginSubject.next(true);
  }

  public hideAuthLogin(): void {
    this.authLoginSubject.next(false);
  }
}
