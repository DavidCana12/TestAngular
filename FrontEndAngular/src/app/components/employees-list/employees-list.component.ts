import { Employee } from './../../shared/employee';
import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CrudHttpService } from 'src/app/crud-http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  durationInSeconds = 5;
  EmployeeData: any = [];
  dataSource!: MatTableDataSource<Employee>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'fullName',
    // 'nationalIdentity',
    //'birthDate',
    'email',
    'phone',
    //'organitation',
    'action'
  ];
  constructor(
    private crudHttpService: CrudHttpService,
    private _snackBar: MatSnackBar) {
    this.crudHttpService.list().subscribe((data: any) => {
      this.EmployeeData = data;
      console.log(this.EmployeeData);
      this.dataSource = new MatTableDataSource<Employee>(this.EmployeeData);
      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);
    });
  }
  ngOnInit() { }
  deleteStudent(index: number, e: { id: any; }) {
    if (window.confirm('Desea eliminar este empleado?')) {
      const data = this.dataSource.data;
      data.splice(
        this.paginator.pageIndex * this.paginator.pageSize + index,
        1
      );
      this.dataSource.data = data;
      this.crudHttpService.delete(e.id).subscribe();

      this.openSnackBar('Se ha eliminado un empleado', 'cerrar');
    }
  }


  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: this.durationInSeconds * 1000,
    });
  }

}
