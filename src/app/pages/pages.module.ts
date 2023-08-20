import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from '../shared/shared.module';
import { TrackingComponent } from './core/tracking/tracking.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { StatisticsDetailComponent } from './statistics-detail/statistics-detail.component';
import { ErrorsComponent } from './errors/errors.component';

@NgModule({
  declarations: [
    TrackingComponent,
    UsersComponent,
    UserFormComponent,
    StatisticsDetailComponent,
    StatisticsComponent,
    ErrorsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    ComponentsModule,
    SharedModule,
  ],
})
export class PagesModule {}
