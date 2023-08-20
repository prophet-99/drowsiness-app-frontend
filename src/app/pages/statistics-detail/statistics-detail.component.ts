import { Component, OnDestroy, OnInit } from '@angular/core';

import { UsersService } from 'src/app/services/users.service';
import { UserModel } from 'src/app/models/user.model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-statistics-detail',
  templateUrl: './statistics-detail.component.html',
})
export class StatisticsDetailComponent implements OnInit, OnDestroy {
  public baseAPI = environment.API_BASE_URL;
  public currentUser!: UserModel;

  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getFromSessionStorage();
  }

  ngOnDestroy(): void {
    this.userService.deleteFromSessionStorage();
  }
}
