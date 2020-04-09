import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";

import { HttpTokenInterceptor } from "./interceptors";
import { 
  ApiService, 
  UsersService, 
  AuthUserService, 
  AuthGuard, 
  NoAuthGuard, 
  AdminGuard, 
  JwtService, 
  DepartmentsService, 
  IndicatorsService, 
  ContractsService,
  PeriodsService, 
  ProfilesService,
  ResetPasswordService,
  ReferencesService,
  BasketItemsService,
  CurrentPeriodService,
  CalcService
} from "./services";

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
    ApiService,
    JwtService,
    UsersService,
    DepartmentsService,
    IndicatorsService,
    ContractsService,
    PeriodsService,
    ProfilesService,
    ReferencesService,
    BasketItemsService,
    AuthUserService,
    CurrentPeriodService,
    ResetPasswordService,
    AuthGuard,
    NoAuthGuard,
    AdminGuard,
    CalcService
  ]
})
export class CoreModule { }