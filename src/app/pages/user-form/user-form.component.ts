import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, mergeMap, of } from 'rxjs';

import { SnackBarService } from 'src/app/components/snack-bar/snack-bar.service';
import { MessageModel } from 'src/app/models/message.model';
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
  @ViewChild('photoInput') private photoInputRef!: ElementRef<HTMLInputElement>;

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
      photo: [],
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

  public hasExtensionError(formControlName: string): boolean | undefined {
    return (
      this.userForm.get(formControlName)?.touched &&
      this.userForm.get(formControlName)?.hasError('extension')
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
      .pipe(
        mergeMap((user) => {
          const parsedUser = user as UserModel;
          return this.saveImage(parsedUser.dni);
        })
      )
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
      .pipe(
        mergeMap((user) => {
          const parsedUser = user as UserModel;
          return this.saveImage(parsedUser.dni);
        })
      )
      .subscribe({
        next: () => {
          this.snackBarService.showSnackBar({
            message: 'Usuario agregado',
            type: 'success',
          });
          this.closeSnackBar();
          this.userForm.reset();
          this.photoInputRef.nativeElement.value = '';
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

  private saveImage(dni: string): Observable<MessageModel | null> {
    const userPhoto: File = this.userForm.value.photo;
    if (userPhoto) {
      return this.userService.savePhoto(dni, userPhoto);
    }
    return of(null);
  }

  public whenFileInputChange(evt: Event): void {
    this.userForm.get('photo')?.markAsTouched();
    const parsedEvt = evt.target as HTMLInputElement;
    const file = parsedEvt.files ? parsedEvt.files[0] : null;

    if (file) {
      const fileExtension = file.name.slice(
        ((file.name.lastIndexOf('.') - 1) >>> 0) + 2
      );
      const allowedExtensions = ['jpg'];
      if (allowedExtensions.includes(fileExtension.toLowerCase())) {
        this.userForm.patchValue({
          photo: file,
        });
        this.userForm.get('photo')?.setErrors(null);
      } else {
        this.photoInputRef.nativeElement.value = '';
        this.userForm.get('photo')?.setErrors({
          extension: true,
        });
      }
    }
  }

  private closeSnackBar(): void {
    setTimeout(() => this.snackBarService.hideSnackBar(), 3000);
  }
}
