import { Injectable } from "@angular/core";

import { Metering } from "../models";

@Injectable()
export class CalcService {
  
  calcPercentDifference(meter, orientation, limit): Metering {
    if (meter.actual !== "" && meter.target !== "") {
      if (orientation === 'higher') {
        meter.difference = meter.actual - meter.target;
        meter.percent = (meter.actual / meter.target) * 100;
      } else {
        meter.difference = meter.target - meter.actual;
        meter.percent = (meter.target / meter.actual) * 100;
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