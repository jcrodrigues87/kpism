import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

import { Department, DepartmentsService, User, UsersService } from "../../core";
import { tap, map } from "rxjs/operators";

@Component({
  templateUrl: './department-editor.component.html'
})
export class DepartmentEditorComponent implements OnInit {
  department: Department = {} as Department;
  users: Array<User> = [];
  departments: Array<Department> = [];
  departmentForm: FormGroup;
  errors: Object = {};
  isSubmitting = false;

  selectedUser: any;

  public confirmModal: any;

  constructor(
    private departmentsService: DepartmentsService,
    private usersService: UsersService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.departmentForm = this.fb.group({
      name: '',
      description: '',
      manager: '',
      childOf: ''
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { department: Department }) => {
        this.department = data.department;
        this.departmentForm.patchValue(data.department);

        this.departmentsService.query().pipe(map(dep => dep.filter(d => d.id !== data.department.id))).subscribe(departments => {
          this.departments = departments;
        });
      }
    );

    this.usersService.query().subscribe(users => {
      this.users = users;
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {};

    this.update(this.departmentForm.value);
    
    this.departmentsService.save(this.department).subscribe(
      department => {
        this.department = department;
        this.isSubmitting = false;
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  back() {
    this.router.navigateByUrl('admin/departments');
  }

  modified(a, b): any {
    const aProps = Object.getOwnPropertyNames(a);

    let toReturn: any = {}

    for (var i = 0; i < aProps.length; i++) {
        var propName = aProps[i];

        // If values of same property are not equal,
        // objects are not equivalent
        if (a[propName] !== b[propName]) {
            toReturn[propName] = a[propName];
        }
    }

    return toReturn;
  }

  update(values: Object) {
    Object.assign(this.department, values);
  }

  delete() {
    this.isSubmitting = true;
    this.errors = {};

    this.departmentsService.destroy(this.department.id).subscribe(
      data => this.back(),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}