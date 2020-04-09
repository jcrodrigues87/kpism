import { Component, OnInit } from "@angular/core";

import { DepartmentsService, Department } from "../../core";
import { Router } from "@angular/router";

@Component({
  templateUrl: './departments.component.html'
})
export class DepartmentsComponent implements OnInit {

  departments: Department[] = [];
  searchText: String;

  constructor(
    private departmentsService: DepartmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.departmentsService.query().subscribe(
      data => {
        this.departments = data;
      }
    );
  }
  
  addNew(): void {
    this.router.navigateByUrl('admin/departments/new');
  }
}