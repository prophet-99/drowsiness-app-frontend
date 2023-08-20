import { Component } from '@angular/core';

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styles: [
    `
      .sh-backdrop {
        min-height: 60vh;
        background-image: url('^assets/gifs/not-found.gif');
        background-repeat: no-repeat;
        background-position: center;
      }
    `,
  ],
})
export class ErrorsComponent {}
