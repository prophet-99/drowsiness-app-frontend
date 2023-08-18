import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public enableBackdrop = false;

  public enableSidebar(sidebarRef: HTMLElement): void {
    this.enableBackdrop = true;
    sidebarRef.classList.remove('-translate-x-full');
  }

  public disableSidebar(sidebarRef: HTMLElement): void {
    this.enableBackdrop = false;
    sidebarRef.classList.add('-translate-x-full');
  }
}
