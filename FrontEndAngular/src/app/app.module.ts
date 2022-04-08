import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';

import { HttpClientModule } from '@angular/common/http';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    EmployeesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }
