import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent {
  @Input() public customClass = '';

  constructor(public loaderService: LoaderService) {}
}
