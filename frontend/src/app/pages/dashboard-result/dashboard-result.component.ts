import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/_services/student.service';
import { BackendService } from 'src/app/_services/backend.service';

@Component({
  selector: 'app-dashboard-result',
  templateUrl: './dashboard-result.component.html',
  styleUrls: ['./dashboard-result.component.css']
})
export class DashboardResultComponent implements OnInit {
  searches: any[];
  suggestions = [];
  currentResult:string;
  type: string;
  result = [];
  search: string;
  current: number;
  audio: any;
  constructor(private _store: Store<any>, private router: Router, private dialog: MatDialog, private student: StudentService, private backend: BackendService) {
    this._store.select('UserDataReducer').subscribe((val:any) => {
      console.log(val);
      this.searches = val.searches;
      this.currentResult = val.currentResult;
      if (this.currentResult != null) {
        this.fetchResult();
      }
      if (val.suggestions != null) {
        this.suggestions = JSON.parse(JSON.stringify(val.suggestions)).splice(0,4);
      }
    })
  }
  fetchResult(){
    this.backend.getResult(this.currentResult).subscribe((val:any) => {
      console.log(val);
      if (val.success == true) {
        this.type = val.type;
        this.search = val.search;
        this.result = val.result;        
      }
    })    
  }
  ngOnInit(): void {
    this.current = 0;
  }
  navigateToAdd() {
    this.router.navigate(['/dashboard/add'])
  }
  goTo(index) {
    if (index == this.current) return ;
    this.current = index;
  }
  next() {
    if (this.current == this.result.length - 1) return ;
    this.current +=1;
  }
  prev() {
    if (this.current == 0) return;
    this.current -= 1;
  }
  playAudio() {
    this.audio = new Audio();
    this.audio.src = this.result[this.current].voice
    this.audio.load();
    this.audio.play();
  }

  stopAudio() {
    this.audio.pause();
  }

  visualise(text) {
    this.student.searchVisualization(text);
    let dialog = this.dialog.open(LoadingComponent, { disableClose: true })
    this.student.resultAvailable.subscribe((val) => {
      if (val == true) {
        dialog.close();
        this.router.navigate(['/dashboard/result']);
      }
    })
  }
}
