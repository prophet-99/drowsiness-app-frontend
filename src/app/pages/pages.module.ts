import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { TrackingComponent } from './tracking/tracking.component';
import { ErrorsComponent } from './errors/errors.component';

@NgModule({
  declarations: [
    UsersComponent,
    TrackingComponent,
    ErrorsComponent,
    UserFormComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    ComponentsModule,
  ],
})
export class PagesModule {}
