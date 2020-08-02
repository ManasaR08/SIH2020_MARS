import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BackendService } from 'src/app/_services/backend.service';
import {StudentService} from '../../_services/student.service';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css']
})
export class DashboardHomeComponent implements OnInit {
  access: string;
  popularTeachers = [];
  suggestions = [];
  students = [];
  uploads = [];
  
  constructor(private _store: Store<any>, private router: Router, private backend: BackendService, private student: StudentService) {
    this._store.select('UserStateReducer').subscribe(data => {
      this.access = data.access;
      this.setupDashboard();
    });
  }

  ngOnInit(): void {
  }
  navigateToAdd() {
    this.router.navigate(['/dashboard/add'])
  }

  setupDashboard() {
    if (this.access == 'student') {
      this.backend.popularTeachers().subscribe((val: any) =>{ 
        if (val.success == true){
          this.popularTeachers = val.teachers;
        }
        console.log(val);
      });
      this.backend.getSuggestions().subscribe((val: any) => {
        console.log(val);
        if (val.success == true) {
          this.student.setSuggestions(val.suggestions);
          this.suggestions = JSON.parse(JSON.stringify(val.suggestions)).splice(0,4);
        }
      });
    } else {
      
    }
  }

  joinClass(id) {

  }
  visualise(text) {

  }
}


