import { Component, Input, OnInit } from '@angular/core';
//import { navItems } from './../../_nav';
import { AuthUserService } from '../../core';

import { Observable } from "rxjs";
import { map, take } from "rxjs/operators";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public navItems; //= navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  constructor(
    private authUserService: AuthUserService
  ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }

  ngOnInit(): void {
    this.navItems = this.authUserService.getNavItems();
  }
}
