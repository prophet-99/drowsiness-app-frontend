import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { SnackBarService } from 'src/app/components/snack-bar/snack-bar.service';
import { UserModel } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styles: [],
  providers: [SnackBarService],
})
export class UserFormComponent implements OnInit {
  public userForm!: FormGroup;
  private currentUser!: UserModel;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private activatedRoute: ActivatedRoute,
    private snackBarService: SnackBarService
  ) {}

  ngOnInit(): void {
    // ROUTE
    const { dni } = this.activatedRoute.snapshot.params;
    this.currentUser = this.userService.getFromSessionStorage();
    this.userService.deleteFromSessionStorage();

    // INIT FORM
    this.userForm = this.formBuilder.group({
      name: [dni ? this.currentUser.name : '', [Validators.required]],
      lastName: [dni ? this.currentUser.lastName : '', [Validators.required]],
      dni: [
        dni || '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(8),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      cellphone: [
        dni ? this.currentUser.cellphone : '',
        [
          Validators.required,
          Validators.minLength(9),
          Validators.maxLength(9),
          Validators.pattern('^[0-9]+$'),
        ],
      ],
      email: [
        dni ? this.currentUser.email : '',
        [Validators.required, Validators.pattern(/\S+@\S+\.\S+/)],
      ],
    });
  }

  public hasGenericError(formControlName: string): boolean | undefined {
    const hasError = this.userForm.get(formControlName)?.errors ? true : false;
    return this.userForm.get(formControlName)?.touched && hasError;
  }

  public hasRequiredError(formControlName: string): boolean | undefined {
    return (
      this.userForm.get(formControlName)?.touched &&
      this.userForm.get(formControlName)?.hasError('required')
    );
  }

  public hasMaxLengthError(formControlName: string): boolean | undefined {
    return (
      this.userForm.get(formControlName)?.touched &&
      this.userForm.get(formControlName)?.hasError('maxlength')
    );
  }

  public hasMinLengthError(formControlName: string): boolean | undefined {
    return (
      this.userForm.get(formControlName)?.touched &&
      this.userForm.get(formControlName)?.hasError('minlength')
    );
  }

  public hasPatternError(formControlName: string): boolean | undefined {
    return (
      this.userForm.get(formControlName)?.touched &&
      this.userForm.get(formControlName)?.hasError('pattern')
    );
  }

  public processUser(): void {
    if (this.userForm.invalid) return;

    if (this.currentUser) this.editUser();
    else this.saveUser();
  }

  public editUser(): void {
    this.userService
      .update({
        name: this.userForm.value.name.trim(),
        lastName: this.userForm.value.lastName.trim(),
        cellphone: this.userForm.value.cellphone,
        dni: this.userForm.value.dni,
        email: this.userForm.value.email.trim(),
      })
      .subscribe({
        next: () => {
          this.snackBarService.showSnackBar({
            message: 'Usuario editado',
            type: 'success',
          });
          this.closeSnackBar();
        },
        error: (err: HttpErrorResponse) => {
          this.snackBarService.showSnackBar({
            message: err.error.message,
            type: 'error',
          });
          this.closeSnackBar();
        },
      });
  }

  public saveUser(): void {
    this.userService
      .save({
        name: this.userForm.value.name.trim(),
        lastName: this.userForm.value.lastName.trim(),
        cellphone: this.userForm.value.cellphone,
        dni: this.userForm.value.dni,
        email: this.userForm.value.email.trim(),
      })
      .subscribe({
        next: () => {
          this.snackBarService.showSnackBar({
            message: 'Usuario agregado',
            type: 'success',
          });
          this.closeSnackBar();
          this.userForm.reset();
        },
        error: (err: HttpErrorResponse) => {
          this.snackBarService.showSnackBar({
            message: err.error.message,
            type: 'error',
          });
          this.closeSnackBar();
        },
      });
  }

  private closeSnackBar(): void {
    setTimeout(() => this.snackBarService.hideSnackBar(), 3000);
  }
}
