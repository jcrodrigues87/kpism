import { Component, Input, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { Reference } from '../../core';

@Component({
  selector: 'dynamic-table',
  templateUrl: './dynamic-table.component.html'
})
export class DynamicTableComponent implements OnInit {
  @Input() columns: string[];
  @Input() titles: string[];
  @Input() rows: any;
  @Input() viewButton: boolean = false;
  @Input() viewButtonRoute: string;
  @Input() propertyId: string = 'id';
  @Input() filterText: String;
  @Input() periodMonthCol: number = undefined;

  references: Array<Reference>;

  constructor(
    private router: Router
  ) {
    this.references = [
      {refName: 'Nenhum', refOrder: 0},
      {refName: 'Janeiro', refOrder: 1},
      {refName: 'Fevereiro', refOrder: 2},
      {refName: 'Março', refOrder: 3},
      {refName: 'Abril', refOrder: 4},
      {refName: 'Maio', refOrder: 5},
      {refName: 'Junho', refOrder: 6},
      {refName: 'Julho', refOrder: 7},
      {refName: 'Agosto', refOrder: 8},
      {refName: 'Setembro', refOrder: 9},
      {refName: 'Outubro', refOrder: 10},
      {refName: 'Novembro', refOrder: 11},
      {refName: 'Dezembro', refOrder: 12},
    ]   
  }

  ngOnInit(): void {
    if (this.columns[0] == 'name')
      this.rows.sort((a,b)=>a.name.localeCompare(b.name));
    else if (this.columns[0] == 'year')
      this.rows.sort((a,b)=>a.year.localeCompare(b.year));
  }

  viewButtonAction(propertyIdValue) {
    this.router.navigateByUrl(`${this.viewButtonRoute}/${propertyIdValue}`);
  }

  getValue(row: any, col: string, index) {

    if (!row)
      return '';
      
    let props: string[];

    props = col.split('.');

    if (props.length === 1)  {
      if (row[col] === true)
        return "Sim";
      else if (row[col] === false)
        return "Não";
      else if (this.periodMonthCol != undefined && this.periodMonthCol == index) {
        return this.references[row[col]].refName
      }
      else
        return row[col];
    } else 
      return this.getValue(row[props[0]], this.removeFist(col, '.'), index);
      
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