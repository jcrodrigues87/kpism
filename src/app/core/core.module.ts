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
  ResponsablesService, 
  ProfilesService,
  MeteringsService,
  ResetPasswordService,
  ChartDataService,
  ReferencesService,
  BasketItemsService,
  CurrentPeriodService
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
    ChartDataService,
    DepartmentsService,
    IndicatorsService,
    ContractsService,
    MeteringsService,
    PeriodsService,
    ProfilesService,
    ReferencesService,
    ResponsablesService,
    BasketItemsService,
    AuthUserService,
    CurrentPeriodService,
    ResetPasswordService,
    AuthGuard,
    NoAuthGuard,
    AdminGuard
  ]
})
export class CoreModule { }