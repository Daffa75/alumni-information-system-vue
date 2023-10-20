import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AlumniService } from '../services/alumni.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-data-add-edit',
  templateUrl: './data-add-edit.component.html',
  styleUrls: ['./data-add-edit.component.scss']
})
export class DataAddEditComponent {
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
    private _dialogRef: MatDialogRef<DataAddEditComponent>
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

  onFormSubmit() {
    if (this.dataForm.valid) {
      this._alumniService.addAlumi(this.dataForm.value).subscribe({
        next: (val: any) => {
          alert('Employee added successfully');
          this._dialogRef.close(true);
        },
        error: (err: any) => {
          console.error(err);
        },
      })
    }
  }
}
