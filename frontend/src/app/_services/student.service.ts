import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  resultAvailable: Subject<boolean>;
  constructor(private _store: Store<any>, private router: Router, private backend: BackendService) {
    this.resultAvailable = new Subject();
  }

  setSuggestions(suggestions) {
    this._store.dispatch({
      type: 'ADD_SUGGESTIONS',
      payload: suggestions,
    });
  }

  getSearchesView() {
    this.backend.getSearches().subscribe((val:any) => {
      if (val.success == true) {
        this._store.dispatch({
          type: 'SET_SEARCHES',
          payload: val.searches
        });
      }
    });
  }

  addTeacher(name, id, uploads) {
    this.backend.addTeacherToStudent(id).subscribe((val: any) => {
      console.log(val);
      if (val.success == true) {
        this._store.dispatch({
          type: 'ADD_TEACHER',
          payload: {name, id, uploads}
        })
      }
    })
  }

  getTeachersView() {
    this.backend.popularTeachers().subscribe((val: any) =>{ 
      if (val.success == true){
        this._store.dispatch({
          type: 'SET_POPULAR_TEACHERS',
          payload: val.teachers
        })
      }

    });
    this.backend.teachersForStudent().subscribe((val:any) => {
      if (val.success) {
        this._store.dispatch({
          type: 'SET_TEACHERS',
          payload: val.teachers
        })
      }
    })
  }
  addQuery(text) {
    this.resultAvailable.next(false);
    this.backend.addSearch(text, 'answer').subscribe((val:any) => {
      if (val.success == true) {
        this._store.dispatch({
          type: 'ADD_SEARCH',
          payload: {text, id: val.id, result: val.result},
        });
        this.resultAvailable.next(true);
      } else {
        this.resultAvailable.next(true);
      }
    });
  }

  searchVisualization(text) {    
    this.resultAvailable.next(false);
    this.backend.addSearch(text, 'visualise').subscribe((val:any) => {
      if (val.success == true) {
        this._store.dispatch({
          type: 'ADD_SEARCH',
          payload: {text, id: val.id, result: val.result},
        });
        this.resultAvailable.next(true);
      } else {
        this.resultAvailable.next(true);
      }
    });
  }
}
