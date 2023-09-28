import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthLoginService } from './auth-login.service';
import { AuthService } from 'src/app/services/auth.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthLoginComponent implements OnInit {
  public authFrom!: FormGroup;
  private generalErrorSubject = new BehaviorSubject<boolean>(false);
  public generalError$ = this.generalErrorSubject.asObservable();
  @Output() public isLoggedIn = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    public authLoginService: AuthLoginService
  ) {}

  ngOnInit(): void {
    this.authFrom = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  public hasGenericError(formControlName: string): boolean | undefined {
    const hasError = this.authFrom.get(formControlName)?.errors ? true : false;
    return this.authFrom.get(formControlName)?.touched && hasError;
  }

  public hasRequiredError(formControlName: string): boolean | undefined {
    return (
      this.authFrom.get(formControlName)?.touched &&
      this.authFrom.get(formControlName)?.hasError('required')
    );
  }

  public checkCredentials(): void {
    this.generalErrorSubject.next(false);
    if (this.authFrom.invalid) return;

    const username = this.authFrom.value.username.trim();
    const password = this.authFrom.value.password.trim();

    this.authService.login({ username, password }).subscribe({
      next: () => {
        this.isLoggedIn.emit(true);
        this.closeAuthLogin();
      },
      error: () => this.generalErrorSubject.next(true),
    });
  }

  public closeAuthLogin(): void {
    this.authLoginService.hideAuthLogin();
  }
}
