import { Injectable } from "@angular/core";

import { Metering, ContractIndicator, Reference } from "../models";
import { ContractsService } from './contracts.service';
import { reference } from '@angular/core/src/render3';

@Injectable()
export class CalcService {

  constructor(
    private contractService: ContractsService,
  ) {}
  
  calcPercentDifference(meter, orientation, limit): Metering {
    if (meter.actual !== "" && meter.target !== "") {
      if (orientation === 'higher') {
        meter.difference = meter.actual - meter.target;
        meter.percent = meter.target ? (meter.actual / meter.target) * 100 : 0;
        if (meter.target == 0) {
          meter.percent = meter.actual * 100; 
        }
      } else {
        meter.difference = meter.target - meter.actual;
        meter.percent = meter.actual ? (meter.target / meter.actual) * 100 : 0;
        if (meter.actual == 0) {
          meter.percent = meter.target * 100;
        }
      }
      if (meter.target == 0 && meter.actual == 0) {
        meter.percent = 100;
      }
    } else {
      meter.difference = 0;  
      meter.percent = 0;
    }
    if (meter.percent > limit)
      meter.percent = limit;
    return meter
  }

  calcAccumulated(indicatorList, reference): Array<Metering> { // receive an indicator list and a reference and calc the result
    var accumulated: Array<Metering> = [];
    for (var i = 0; i < indicatorList.length; i++) {
      accumulated.push({id: "", refOrder: reference.refOrder, refName: reference.refName, target: 0, actual: 0, difference: 0, percent: 0, inactive: true})
      if (indicatorList[i].indicator.accumulatedType == "sum") {
        for (var j = 0; j < reference.refOrder; j++) {
          if (!indicatorList[i].indicator.metering[j].inactive) {
            accumulated[i].inactive = false;
            accumulated[i].target += indicatorList[i].indicator.metering[j].target;
            accumulated[i].actual += indicatorList[i].indicator.metering[j].actual;
          }
        }
      } else if  (indicatorList[i].indicator.accumulatedType == "avg") {
        var months = 0;
        for (var j = 0; j < reference.refOrder; j++) {
          if (!indicatorList[i].indicator.metering[j].inactive) {
            accumulated[i].inactive = false;
            accumulated[i].target += indicatorList[i].indicator.metering[j].target;
            accumulated[i].actual += indicatorList[i].indicator.metering[j].actual;
            months += 1;
          }
        }
        accumulated[i].target /= months;
        accumulated[i].actual /= months;
      } else {
        if (!indicatorList[i].indicator.metering[reference.refOrder-1].inactive) {
          accumulated[i].inactive = false;
          accumulated[i] = indicatorList[i].indicator.metering[reference.refOrder-1]
        }
      }
      accumulated[i] = this.calcPercentDifference(accumulated[i], indicatorList[i].indicator.orientation, indicatorList[i].indicator.limit)
    }
    return accumulated;
  }

  calcQuantitative(indicatorList): number { // receive an user and return the quantitative (final result of accumulated) 
    var accumulated: Array<Metering> = [];
    var reference = {refName: 'Dezembro', refOrder: 12};
    var summation = 0;
    var weight = 0;
    accumulated = this.calcAccumulated(indicatorList, reference)
    for (var j = 0; j < accumulated.length; j++) {
      summation += accumulated[j].percent * indicatorList[j].weight;
      weight += indicatorList[j].weight;
    }
    return (weight ? (summation / weight) : 0);
  }

}