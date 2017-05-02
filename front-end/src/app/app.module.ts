import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdButtonModule, MdIconModule, MdInputModule, MdChipsModule, MdTabsModule, MdSelectModule } from '@angular/material';
import { MdlModule } from '@angular-mdl/core';
import { Md2Module }  from 'md2';

import { ListEmployeesComponent, DialogDeleteEmployee, DialogFilterEmployee } from './page-content/list-employees/list-employees.component';
import { FormEmployeeComponent } from './page-content/form-employee/form-employee.component';
import { HeaderComponent } from './header/header.component';
import { EmployeeService } from './employee.service';
import { OfficeLocationService } from './office-location.service';
import { SharedService } from './shared.service';

import { lookupListToken, lookupLists } from './lookup-list.providers';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ListEmployeesComponent,
    DialogDeleteEmployee,
    DialogFilterEmployee,
    FormEmployeeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdButtonModule,
    MdIconModule, 
    MdInputModule,
    MdChipsModule, 
    MdTabsModule,
    AppRoutingModule,
    MdSelectModule,
    MdlModule,
    Md2Module.forRoot(),
  ],
  entryComponents: [ ListEmployeesComponent, DialogDeleteEmployee, DialogFilterEmployee ],
  providers: [EmployeeService, SharedService, OfficeLocationService,{ provide: lookupListToken, useValue: lookupLists },],
  bootstrap: [AppComponent]
})
export class AppModule { }