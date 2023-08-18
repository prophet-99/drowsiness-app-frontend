import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { SnackBarActionModel } from './models/snack-bar-action.model';

@Injectable()
export class SnackBarService {
  private snackBarSubject = new BehaviorSubject<SnackBarActionModel>({
    show: false,
    type: 'success',
    message: '',
  });

  public snackBar$ = this.snackBarSubject.asObservable();

  public showSnackBar(action: Omit<SnackBarActionModel, 'show'>): void {
    this.snackBarSubject.next({
      ...action,
      show: true,
    });
  }

  public hideSnackBar(): void {
    this.snackBarSubject.next({
      message: '',
      show: false,
      type: 'success',
    });
  }
}
