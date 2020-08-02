import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BackendService } from 'src/app/_services/backend.service';
import {StudentService} from '../../_services/student.service';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { MatDialog } from '@angular/material/dialog';

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
  
  constructor(private _store: Store<any>, private router: Router, private backend: BackendService, private student: StudentService, private dialog: MatDialog) {
    this._store.select('UserStateReducer').subscribe(data => {
      this.access = data.access;
      this.setupDashboard();
    });
  }

  visualiseSearch(text) {
    this.student.searchVisualization(text);
    let dialog = this.dialog.open(LoadingComponent, { disableClose: true })
    this.student.resultAvailable.subscribe((val) => {
      dialog.close();
      if (val == true) {
        this.router.navigate(['/dashboard/result']);
      }
    })
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


