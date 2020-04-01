import { Injectable } from "@angular/core";

import { Metering } from "../models";

@Injectable()
export class CalcService {
  
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

  calcAccumulated(indicatorList, reference): Array<Metering> { // receive an i and an accumulated list and calc the result
    var accumulated: Array<Metering> = [];
    for (var i = 0; i < indicatorList.length; i++) {
      accumulated.push({id: "", refOrder: reference.refOrder, refName: reference.refName, target: 0, actual: 0, difference: 0, percent: 0, createdAt: undefined, updatedAt: undefined})
      if (indicatorList[i].indicator.accumulatedType == "sum") {
        for (var j = 0; j < reference.refOrder; j++) {
          accumulated[i].target += indicatorList[i].indicator.metering[j].target;
          accumulated[i].actual += indicatorList[i].indicator.metering[j].actual;
        }
      } else if  (indicatorList[i].indicator.accumulatedType == "avg") {
        for (var j = 0; j < reference.refOrder; j++) {
          accumulated[i].target += indicatorList[i].indicator.metering[j].target;
          accumulated[i].actual += indicatorList[i].indicator.metering[j].actual;
        }
        accumulated[i].target /= indicatorList[i].indicator.metering[j-1].refOrder;
        accumulated[i].actual /= indicatorList[i].indicator.metering[j-1].refOrder;
      } else {
        accumulated[i] = indicatorList[i].indicator.metering[reference.refOrder-1]
      }
      accumulated[i] = this.calcPercentDifference(accumulated[i], indicatorList[i].indicator.orientation, indicatorList[i].indicator.limit)
    }
    return accumulated;
  }

}