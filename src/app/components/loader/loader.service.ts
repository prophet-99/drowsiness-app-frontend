import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  delay,
  finalize,
  of,
  tap,
} from 'rxjs';

@Injectable()
export class LoaderService {
  private loaderSubject = new BehaviorSubject<boolean>(false);
  public loader$ = this.loaderSubject.asObservable();

  public showLoaderUntilCompleted<T>(obs$: Observable<T>): Observable<T> {
    return of(null).pipe(
      tap(() => this.showLoader(true)),
      concatMap(() => obs$),
      delay(300),
      finalize(() => this.showLoader(false))
    );
  }

  public showLoader(indicator: boolean): void {
    this.loaderSubject.next(indicator);
  }
}
