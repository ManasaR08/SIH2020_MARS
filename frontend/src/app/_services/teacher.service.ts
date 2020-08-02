import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  constructor(private _store: Store<any>, private router: Router, private backend: BackendService) { }
  getStudentsView() {
    this.backend.getStudents().subscribe((val: any) => {
      console.log(val);
      if (val.success == true) {
        this._store.dispatch({
          type: 'SET_STUDENTS',
          payload: val.students
        });
      }
    })
  }
  deleteDocument(id) {
    this.backend.deleteUpload(id).subscribe((val:any) => {
      console.log(val);
      if (val.success == true) {
        this._store.dispatch({
          type:'DELETE_DOCUMENT',
          payload: id
        });
      }
    })
  }
  getUploadsView() {
    this.backend.getUploads().subscribe((val: any) => {
      if (val.success == true) {
        this._store.dispatch({
          type: 'SET_UPLOADS',
          payload: val.uploads
        })        
      }
    })
  }
}
