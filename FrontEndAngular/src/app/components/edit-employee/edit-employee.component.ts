import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild, NgZone } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CrudHttpService } from 'src/app/crud-http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
export interface Subject {
  name: string;
}

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {

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
    this.updateBookForm();
  }
  constructor(
    public fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private actRoute: ActivatedRoute,
    private crudHttpService: CrudHttpService,
    private _snackBar: MatSnackBar
  ) {

    this.crudHttpService.listOrganitation().subscribe((data: any) => {
      this.SectioinArray = data;
    });


    var id = this.actRoute.snapshot.paramMap.get('id');
    this.crudHttpService.GetEmployee(id).subscribe((data) => {
      console.log(data.subjects);
      this.subjectArray = data.subjects;
      this.employeeForm = this.fb.group({
        fullName: [data.fullName, [Validators.required]],
        nationalIdentity: [data.nationalIdentity, [Validators.required]],
        birthDate: [data.birthDate, [Validators.required]],
        email: [data.email, [Validators.required, Validators.email]],
        phone: [data.phone, [Validators.required]],
        organitation: [data.organitation],
      });
    });
  }
  /* Reactive book form */
  updateBookForm() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required]],
      nationalIdentity: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      organitation: [this.subjectArray],
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
  formatDate(e: { target: { value: string | number | Date; }; }) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    /*  this.employeeForm.get('dob').setValue(convertDate, {
       onlyself: true,
     }); */
  }
  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.employeeForm.controls[controlName].hasError(errorName);
  };
  /* Update book */
  updateStudentForm() {
    console.log(this.employeeForm.value);
    var id = this.actRoute.snapshot.paramMap.get('id');

    this.crudHttpService
      .update(id, this.employeeForm.value)
      .subscribe((res: any) => {
        this.openSnackBar('Se ha actualizado un empleado', 'cerrar');
        this.ngZone.run(() => this.router.navigateByUrl('/employees-list'));
      });

  }

}
