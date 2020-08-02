import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { Store } from '@ngrx/store';
import { StudentService } from 'src/app/_services/student.service';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-dashboard-add',
  templateUrl: './dashboard-add.component.html',
  styleUrls: ['./dashboard-add.component.css']
})
export class DashboardAddComponent implements OnInit {
  @ViewChild('stepper') private myStepper: MatStepper;
  selected1: string;
  selected2: string;
  enteredText: FormControl;
  suggestions = [];
  constructor(private _store: Store<any>, private student: StudentService, private router: Router,
    private dialog: MatDialog) {
    this._store.select('UserDataReducer').subscribe(data => {
      this.suggestions = data.suggestions;
    });
    this.enteredText = new FormControl('');
  }

  ngOnInit(): void {
  }

  select(val: string) {
    this.selected1 = val;
    this.myStepper.next();    
  }
  selectType(val: string) {
    this.selected2 = val;
    this.myStepper.next();
  }

  getAnswer() {
    if (this.selected2 == 'answer') {
      if (this.selected1 == 'text') {
        if (this.enteredText.value == '') return;
        this.addQuery(this.enteredText.value)
        let dialog = this.dialog.open(LoadingComponent, { disableClose: true })
        this.student.resultAvailable.subscribe((val) => {
          if (val == true) {
            dialog.close();
            this.router.navigate(['/dashboard/result']);
          }
        })

      } else if (this.selected1 == 'voice') {
  
      } else if (this.selected1 == 'image') {
  
      }
    } else if (this.selected2 == 'visualise') {
      if (this.selected1 == 'text') {
        if (this.enteredText.value == '') return;
        this.visualise(this.enteredText.value)
        let dialog = this.dialog.open(LoadingComponent, { disableClose: true })
        this.student.resultAvailable.subscribe((val) => {
          if (val == true) {
            dialog.close();
            this.router.navigate(['/dashboard/result']);
          }
        })
      } else if (this.selected1 == 'voice') {
  
      } else if (this.selected1 == 'image') {
  
      }
    }
  }
  addQuery(text) {
    this.student.addQuery(text);
  }
  visualise(text) {
    this.student.searchVisualization(text);
  }
}
