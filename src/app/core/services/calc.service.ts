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

}