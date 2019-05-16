import { Component, Input, OnInit } from "@angular/core";

import { 
  Indicator, 
  MeteringsService, 
  Period,
  Metering,
  ChartData,
  ChartDataService
} from "../../core";

@Component({
  selector: 'indicator-chart',
  templateUrl: './indicator-chart.component.html'
})
export class IndicatorChartComponent {

  // barChart
  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  barChartType = 'bar';
  barChartLegend = true;
  chartData: ChartData;
  indicatorId: string;
  periodId: string;
  indicatorName: string;
  periodName: string;

  @Input() set indicator(indicator: Indicator) {
    if (indicator && indicator !== undefined) {
      this.indicatorId = indicator.id;
      this.indicatorName = indicator.name;

      this.loadChartData();
    }
  }

  @Input() set period(period: Period) {
    if (period && period !== undefined) {
      this.periodId = period.id;
      this.periodName = period.name;

      this.loadChartData();
    }
  }

  constructor(
    private chartDataService: ChartDataService
  ) {}

  loadChartData(): void {
    if (this.indicatorId && this.periodId)
      this.chartDataService.query(this.indicatorId, this.periodId).subscribe(chartData => {
        this.chartData = chartData;
      });
  }
}