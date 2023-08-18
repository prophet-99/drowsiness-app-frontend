import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrackingComponent } from './tracking/tracking.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ErrorsComponent } from './errors/errors.component';

const routes: Routes = [
  { path: 'tracking', component: TrackingComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/form', component: UserFormComponent },
  { path: 'users/form/:dni', component: UserFormComponent },
  { path: '**', component: ErrorsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
