import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { SidebarComponent } from './sidebar/sidebar.component';
import { LoaderComponent } from './loader/loader.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { PopUpConfirmComponent } from './pop-up-confirm/pop-up-confirm.component';
import { AuthLoginComponent } from './auth-login/auth-login.component';

@NgModule({
  declarations: [
    SidebarComponent,
    LoaderComponent,
    SnackBarComponent,
    PopUpConfirmComponent,
    AuthLoginComponent,
  ],
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  exports: [
    SidebarComponent,
    LoaderComponent,
    SnackBarComponent,
    PopUpConfirmComponent,
    AuthLoginComponent,
  ],
})
export class ComponentsModule {}
