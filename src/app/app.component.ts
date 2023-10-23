import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DataAddEditComponent } from './data-add-edit/data-add-edit.component';
import { AlumniService } from './services/alumni.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = [
    'namaLengkap',
    'namaPanggilan',
    'jenisKelamin',
    'agama',
    'email',
    'dob',
    'alamat',
    'fakultas',
    'tahunMasuk',
    'sektorUsaha',
    'jabatan',
    'namaKantor',
    'alamatKantor',
    'action'
  ];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _alumniService: AlumniService,
    private _coreService: CoreService,
  ) { }

  ngOnInit(): void {
    this.getAlumniList();
  }

  openAddEditDataForm() {
    const dialogRef = this._dialog.open(DataAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAlumniList();
        }
      }
    })
  }

  getAlumniList() {
    this._alumniService.getAlumniList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteAlumni(id: number) {
    this._alumniService.deleteAlumni(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Alumni deleted successfully', 'OK')
        this.getAlumniList();
      },
      error: console.log,
    })
  }

  openEditDataForm(data: any) {
    const dialogRef = this._dialog.open(DataAddEditComponent, {
      data: data
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAlumniList();
        }
      }
    })
  }
}
