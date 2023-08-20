import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appOnErrorImage]',
})
export class OnErrorImageDirective {
  @Input() appOnErrorImage = '';

  constructor(private elementRef: ElementRef) {}

  @HostListener('error')
  loadFallbackOnError(): void {
    const element = this.elementRef.nativeElement as HTMLImageElement;
    element.src = this.appOnErrorImage || 'assets/imgs/user-not-found.png';
  }
}
