import { Component, Input, OnInit } from "@angular/core";

import { 
  Indicator, 
  Period,
  ResponsablesService,
  Responsable
} from "../../core";

@Component({
  selector: 'responsables-table',
  templateUrl: './responsables-table.component.html'
})
export class ResponsablesTableComponent {

  indicatorId: string;
  periodId: string;
  indicatorName: string;
  periodName: string;
  responsables: Array<Responsable> = [];

  @Input() set indicator(indicator: Indicator) {
    if (indicator && indicator !== undefined) {
      this.indicatorId = indicator.id;
      this.indicatorName = indicator.name;

      this.loadResponsables();
    }
  }

  @Input() set period(period: Period) {
    if (period && period !== undefined) {
      this.periodId = period.id;
      this.periodName = period.name;

      this.loadResponsables();
    }
  }

  constructor(
    private responsablesService: ResponsablesService
  ) {}

  loadResponsables(): void {
    if (this.indicatorId && this.periodId)
      this.responsablesService.query(this.indicatorId, this.periodId).subscribe(responsables => {
        this.responsables = responsables;
      });
  }
}