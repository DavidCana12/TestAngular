import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'employees-list' },
  { path: 'add-employee', component: AddEmployeeComponent },
  { path: 'edit-employee/:id', component: EditEmployeeComponent },
  { path: 'employees-list', component: EmployeesListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
