import { Component, OnInit } from "@angular/core";

import { UsersService, User } from "../../core";
import { Router } from "@angular/router";

@Component({
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {

  users: Array<User> = [];

  constructor(
    private usersService: UsersService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.usersService.query().subscribe(
      data => {
        this.users = data;
      }
    );
  }
  
  addNew(): void {
    this.router.navigateByUrl('admin/users/new');
  }
}