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

  jenisKelamin: string[] = [
    'Laki-laki',
    'Perempuan',
  ]

  agama: string[] = [
    'Islam',
    'Kristen',
    'Katolik',
    'Hindu',
    'Budha',
    'Khonghucu',
    'Kepercayaan kepada Tuhan YME',
  ]

  fakultas: string[] = [
    'Fakultas Ekonomi dan Bisnis',
    'Fakultas Hukum',
    'Fakultas Kedokteran',
    'Fakultas Teknik',
    'Fakultas Ilmu Sosial dan Ilmu Politik',
    'Fakultas Ilmu Budaya',
    'Fakultas Pertanian',
    'Fakultas Matematika dan Ilmu Pengetahuan Alam',
    'Fakultas Peternakan',
    'Fakultas Kedokteran Gigi',
    'Fakultas Kesehatan Masyarakat',
    'Fakultas Ilmu Kelautan dan Perikanan',
    'Fakultas Kehutanan',
    'Fakultas Farmasi',
    'Sekolah Pascasarjana',
    'Fakultas Keperawatan',
  ]

  usaha: string[] = [
    'Pemerintahan',
    'Perbankan',
    'Perindustrian',
    'Perdagangan',
    'Pertambangan/Energi',
    'Perhubungan',
    'Pertanian',
    'Peternakan',
    'Perikanan',
    'Dokter',
    'Pengacara',
    'Notaris',
    'Pendidikan',
    'TNI',
    'Polri',
    'Konsultan',
    'Media',
    'Advertising',
    'Kehutanan',
    'Pariwisata',
    'Seni',
    'Kuliner',
    'Event organizer',
    'Ibu rumah tangga'
  ]

  constructor(
    private _fb: FormBuilder,
    private _alumniService: AlumniService,
    private _dialogRef: MatDialogRef<DataAddEditComponent>,
    private _coreService: CoreService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.dataForm = this._fb.group({
      namaLengkap: '',
      namaPanggilan: '',
      jenisKelamin: '',
      agama: '',
      email: '',
      dob: '',
      alamat: '',
      fakultas: '',
      tahunMasuk: '',
      sektorUsaha: '',
      jabatan: '',
      namaKantor: '',
      alamatKantor: '',
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
