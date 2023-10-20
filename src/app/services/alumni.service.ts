import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumniService {

  constructor(private _http: HttpClient) {}

  addAlumi(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/alumni', data);
  }

  getAlumniList(): Observable<any> {
    return this._http.get('http://localhost:3000/alumni');
  }

  deleteAlumni(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/alumni/${id}`);
  }
}
