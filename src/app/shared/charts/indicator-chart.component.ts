import { Component, Input } from "@angular/core";

import { 
  Indicator, 
  ChartData,
} from "../../core";

@Component({
  selector: 'indicator-chart',
  templateUrl: './indicator-chart.component.html'
})
export class IndicatorChartComponent {

  barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };
  barChartType = 'bar';
  barChartLegend = true;
  chartData: ChartData;

  @Input() set indicator(indicator: Indicator) {
    this.chartData = { 
      labels: indicator.metering.map(m => m.refName),
      data: [
        {
          data: indicator.metering.map(m => m.target),
          label: 'Planejado'
        },
        {
          data: indicator.metering.map(m => m.actual),
          label: 'Realizado'
        }
      ]
    }
  }

}