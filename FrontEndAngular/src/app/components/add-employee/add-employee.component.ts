import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { MatChipInputEvent } from '@angular/material/chips';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Router } from '@angular/router';
import { CrudHttpService } from 'src/app/crud-http.service';

export interface Subject {
  name: string;
}

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  durationInSeconds = 5;
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  @ViewChild('chipList') chipList: any;
  @ViewChild('resetStudentForm') myNgForm: any;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  employeeForm!: FormGroup;
  subjectArray: Subject[] = [];
  SectioinArray: any = [];
  ngOnInit() {
    this.submitBookForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudHttpService: CrudHttpService,
    private _snackBar: MatSnackBar
  ) {

    this.crudHttpService.listOrganitation().subscribe((data: any) => {
      this.SectioinArray = data;
    });

  }
  /* Reactive book form */
  submitBookForm() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required]],
      nationalIdentity: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
      organitation: ['To select'],
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      duration: this.durationInSeconds * 1000,
    });
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.subjectArray.length < 5) {
      this.subjectArray.push({ name: value.trim() });
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  /* Remove dynamic languages */
  remove(subject: Subject): void {
    const index = this.subjectArray.indexOf(subject);
    if (index >= 0) {
      this.subjectArray.splice(index, 1);
    }
  }
  /* Date */
  formatDate(e: any) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    /*   this.employeeForm.get('birthDate').setValue(convertDate, {
        onlyself: true,
      }); */
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };
  /* Submit book */
  submitStudentForm() {
    console.log('entro')
    //if (this.employeeForm.valid) {

    this.crudHttpService.create(this.employeeForm.value).subscribe((res) => {
      this.openSnackBar('Se ha creado un empleado', 'cerrar');
      this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
    });
    //}
  }

}
