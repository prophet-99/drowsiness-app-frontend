import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OnErrorImageDirective } from './directives/on-error-image.directive';

@NgModule({
  declarations: [OnErrorImageDirective],
  imports: [CommonModule],
  exports: [OnErrorImageDirective],
})
export class SharedModule {}
