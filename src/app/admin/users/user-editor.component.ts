import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormBuilder } from "@angular/forms";

import { User, UsersService, Department, DepartmentsService } from "../../core";

@Component({
  templateUrl: './user-editor.component.html'
})
export class UserEditorComponent implements OnInit {
  user: User = {} as User;
  userForm: FormGroup;
  departments: Array<Department> = [];
  errors: Object = {};
  isSubmitting = false;

  public confirmModal: any;

  constructor(
    private usersService: UsersService,
    private departmentsService: DepartmentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      name: '',
      email: '',
      department: '',
      role: '',
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(
      (data: { user: User }) => {
        this.user = data.user;
        this.userForm.patchValue(data.user);
      }
    );

    this.departmentsService.query().subscribe(departments => {
      this.departments = departments;
    });
  }

  submitForm() {
    this.isSubmitting = true;
    this.errors = {};

    this.update(this.userForm.value);

    this.usersService.save(this.user).subscribe(
      user => {
        this.user = user;
        this.isSubmitting = false;
        this.back();
      },
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }

  back() {
    this.router.navigateByUrl('admin/users');
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
    Object.assign(this.user, values);
  }

  delete() {
    this.isSubmitting = true;
    this.errors = {};

    this.usersService.destroy(this.user.id).subscribe(
      data => this.back(),
      err => {
        this.errors = err;
        this.isSubmitting = false;
      }
    );
  }
}