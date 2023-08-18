import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { PopUpConfirmComponent } from './pop-up-confirm/pop-up-confirm.component';

@NgModule({
  declarations: [
    SidebarComponent,
    LoaderComponent,
    SnackBarComponent,
    PopUpConfirmComponent,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    SidebarComponent,
    LoaderComponent,
    SnackBarComponent,
    PopUpConfirmComponent,
  ],
})
export class ComponentsModule {}
