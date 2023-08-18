import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SnackBarService } from './snack-bar.service';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackBarComponent {
  constructor(public snackBarService: SnackBarService) {}

  public closeSnackBar(): void {
    this.snackBarService.hideSnackBar();
  }
}
