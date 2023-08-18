import { ChangeDetectionStrategy, Component } from '@angular/core';

import { PopUpConfirmService } from './pop-up-confirm.service';

@Component({
  selector: 'app-pop-up-confirm',
  templateUrl: './pop-up-confirm.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PopUpConfirmComponent {
  constructor(public popUpConfirmService: PopUpConfirmService) {}

  public closePopUpConfirm(): void {
    this.popUpConfirmService.hidePopUpConfirm();
  }
}
