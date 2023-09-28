import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  Subject,
  EMPTY,
  Observable,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs';

import { LoaderService } from 'src/app/components/loader/loader.service';
import { PopUpConfirmService } from 'src/app/components/pop-up-confirm/pop-up-confirm.service';
import { SnackBarService } from 'src/app/components/snack-bar/snack-bar.service';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [LoaderService, PopUpConfirmService, SnackBarService],
})
export class UsersComponent implements OnInit {
  public baseAPI = environment.API_BASE_URL;
  public users$: Observable<UserModel[]> = EMPTY;
  public inputSearch$: Subject<KeyboardEvent> = new Subject();
  public tokenAuthorization = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UsersService,
    private loaderService: LoaderService,
    private popUpConfirmService: PopUpConfirmService,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    // AUTH LOGIC
    this.authService.authorization$.subscribe(
      (token) => (this.tokenAuthorization = token)
    );
    // USERS LOGIC
    this.users$ = this.loaderService.showLoaderUntilCompleted(
      this.userService.getAll(true)
    );
    this.inputSearch$
      .asObservable()
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe({
        next: (nValue) => {
          const valueRef = (nValue?.target as HTMLInputElement).value;
          this.users$ = this.loaderService.showLoaderUntilCompleted(
            this.userService.getAll(true, valueRef)
          );
        },
      });
  }

  public redirectToRouteWithUser(user: UserModel, route: string) {
    this.userService.saveInSessionStorage(user);
    this.router.navigateByUrl(route);
  }

  public showDeletePopUp(dni: string): void {
    this.popUpConfirmService.showPopUpConfirm({
      message: '¿Estás seguro de deshabilitar el usuario?',
      successCallback: this.deleteUser.bind(this, dni),
    });
  }

  private deleteUser(dni: string): void {
    this.userService.delete(dni).subscribe(() => {
      this.popUpConfirmService.hidePopUpConfirm();
      this.users$ = this.loaderService.showLoaderUntilCompleted(
        this.userService.getAll(true)
      );
      this.snackBarService.showSnackBar({
        message: 'Usuario eliminado',
        type: 'success',
      });
      setTimeout(() => this.snackBarService.hideSnackBar(), 3000);
    });
  }
}
