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
  PeriodsService, 
  ResponsablesService, 
  ProfilesService,
  MeteringsService,
  ChartDataService,
  ReferencesService,
  BasketItemsService
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
    MeteringsService,
    PeriodsService,
    ProfilesService,
    ReferencesService,
    ResponsablesService,
    BasketItemsService,
    AuthUserService,
    AuthGuard,
    NoAuthGuard,
    AdminGuard
  ]
})
export class CoreModule { }