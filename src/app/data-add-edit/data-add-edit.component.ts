import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlumniService } from '../services/alumni.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-data-add-edit',
  templateUrl: './data-add-edit.component.html',
  styleUrls: ['./data-add-edit.component.scss']
})
export class DataAddEditComponent implements OnInit {
  dataForm: FormGroup;

  education: string[] = [
    'Matric',
    'Diploma',
    'Intermediate',
    'Graduate',
    'Post Graduate',
  ]

  constructor(
    private _fb: FormBuilder,
    private _alumniService: AlumniService,
    private _dialogRef: MatDialogRef<DataAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataForm = this._fb.group({
      firstName: '',
      lastName: '',
      email: '',
      dob: '',
      gender: '',
      education: '',
      company: '',
      experience: '',
      package: '',
    });
  }

  ngOnInit(): void {
    this.dataForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.dataForm.valid) {
      if (this.data) {
        this._alumniService.updateAlumi(this.data.id, this.dataForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Alumni updated successfully', 'OK')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        })
      } else {
        this._alumniService.addAlumi(this.dataForm.value).subscribe({
          next: (val: any) => {
            this._coreService.openSnackBar('Alumni added successfully', 'OK')
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          },
        })
      }
    }
  }
}
