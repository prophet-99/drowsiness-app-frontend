import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { PopUpActionModel } from './models/pop-up-action.model';

@Injectable()
export class PopUpConfirmService {
  private popUpConfirmSubject = new BehaviorSubject<PopUpActionModel>({
    show: false,
    message: '',
    successCallback: () => {},
  });

  public popUpConfirm$ = this.popUpConfirmSubject.asObservable();

  public showPopUpConfirm(action: Omit<PopUpActionModel, 'show'>): void {
    this.popUpConfirmSubject.next({
      ...action,
      show: true,
    });
  }

  public hidePopUpConfirm(): void {
    this.popUpConfirmSubject.next({
      message: '',
      show: false,
      successCallback: () => {},
    });
  }
}
