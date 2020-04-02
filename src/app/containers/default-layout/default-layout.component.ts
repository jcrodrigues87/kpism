import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthUserService, Period, CurrentPeriodService, AuthUser } from '../../core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  public navItems; //= navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  periods: Array<Period> = [];
  periodForm: FormGroup;

  periodId: String = "";
  user: AuthUser;

  constructor(
    private authUserService: AuthUserService,
    private currentPeriodService: CurrentPeriodService
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
    
    this.currentPeriodService.periods.subscribe(
      data => {
        this.periods = data;
        
        if (this.periodId === "" && this.periods && this.periods[0]) {
          this.periodId = this.periods[this.periods.length-1].id;
          this.changePeriod();
        }
      }
    );

    this.user = this.authUserService.getCurrentAuthUser()
  }
  
  changePeriod(): void {
    this.currentPeriodService.updateCurrentPeriod(
      this.periods.find(e => e.id === this.periodId)
    );
  }
}
