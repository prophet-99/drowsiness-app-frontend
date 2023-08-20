import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StatisticsComponent } from './statistics/statistics.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { StatisticsDetailComponent } from './statistics-detail/statistics-detail.component';
import { ErrorsComponent } from './errors/errors.component';

const routes: Routes = [
  { path: 'statistics', component: StatisticsComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/form', component: UserFormComponent },
  { path: 'users/form/:dni', component: UserFormComponent },
  { path: 'users/statistics-detail', component: StatisticsDetailComponent },
  { path: '**', component: ErrorsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
