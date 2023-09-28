import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { AuthLoginService } from '../auth-login/auth-login.service';
import { SnackBarService } from '../snack-bar/snack-bar.service';
import { PopUpConfirmService } from '../pop-up-confirm/pop-up-confirm.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  providers: [AuthLoginService, SnackBarService, PopUpConfirmService],
})
export class SidebarComponent implements OnInit {
  public enableBackdrop = false;
  public tokenAuthorization = '';
  @ViewChild('sidebarRef') public sidebarRef!: ElementRef<HTMLDivElement>;

  constructor(
    private authService: AuthService,
    private authLoginService: AuthLoginService,
    private snackBarService: SnackBarService,
    private popUpConfirmService: PopUpConfirmService
  ) {}

  ngOnInit(): void {
    // AUTH LOGIC
    this.authService.authorization$.subscribe(
      (token) => (this.tokenAuthorization = token)
    );
  }

  public enableSidebar(): void {
    this.enableBackdrop = true;
    this.sidebarRef.nativeElement.classList.remove('-translate-x-full');
  }

  public disableSidebar(): void {
    this.enableBackdrop = false;
    this.sidebarRef.nativeElement.classList.add('-translate-x-full');
  }

  // AUTH METHODS
  public showLogin(): void {
    this.disableSidebar();
    this.authLoginService.showAuthLogin();
  }

  public whenUserAccesses(): void {
    this.snackBarService.showSnackBar({
      message: 'Accessos validados, ¡bienvenido!',
      type: 'success',
    });
    setTimeout(() => this.snackBarService.hideSnackBar(), 3000);
  }

  public logout(): void {
    this.disableSidebar();
    this.popUpConfirmService.showPopUpConfirm({
      message: '¿Deseas cerrar sesión en la plataforma?',
      successCallback: () => {
        this.authService.logout();
        this.popUpConfirmService.hidePopUpConfirm();
      },
    });
  }
}
