import { Component, Input } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html'
})
export class DynamicTableComponent {
  @Input() columns: string[];
  @Input() titles: string[];
  @Input() rows: any;
  @Input() viewButton: boolean = false;
  @Input() viewButtonRoute: string;
  @Input() propertyId: string = 'id';

  constructor(
    private router: Router
  ) { }

  viewButtonAction(propertyIdValue) {
    this.router.navigateByUrl(`${this.viewButtonRoute}/${propertyIdValue}`);
  }

  getValue(row: any, col: string) {

    if (!row)
      return '';
      
    let props: string[];

    props = col.split('.');

    if (props.length === 1)  {
      if (row[col] === true)
        return "Sim";
      else if (row[col] === false)
        return "Não";
      else
        return row[col];
    } else 
      return this.getValue(row[props[0]], this.removeFist(col, '.'));
      
  }

  removeFist(value: string, separator: string): string {
    let valueArray: string[];
    let toReturn: string = '';

    valueArray = value.split(separator);

    if (valueArray.length > 1) {
      for (let i = 1; i < valueArray.length; i++) {
        if (toReturn.length > 0)
          toReturn = toReturn + '.';
        
        toReturn = toReturn + valueArray[i];
      }

      return toReturn;
    } else
      return valueArray[0];
  }
}