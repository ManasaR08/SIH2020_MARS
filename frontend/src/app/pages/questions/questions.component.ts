import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { LoadingComponent } from 'src/app/components/loading/loading.component';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from 'src/app/_services/student.service';
import { BackendService } from 'src/app/_services/backend.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {
  // searches: any[];
  // suggestions = [];
  currentQuestion:string;
  // type: string;
  // result = [];
  // search: string;
  // current: number;
  questions = [ {
    shortAnswer: [{
      Question: 'nvub',
      Answer: 'nvub'
    }],
    recall: [{
        Question: 'nvub',
        Answer: 'nvub',
        originalSentence: 'nvub'        
    }],
    multipleChoiceQuestions: [{

    }],
    truFalse: [{

    }]
  }];
  uploads = [];
  constructor(private _store: Store<any>, private router: Router, private dialog: MatDialog, private student: StudentService, private backend: BackendService) {
    this._store.select('UserDataReducer').subscribe((val:any) => {
      console.log(val);
      // this.searches = val.searches;
      this.uploads = val.uploads;
      this.currentQuestion = val.currentResult;
      if (this.currentQuestion != null) {
        // this.fetchResult();
      }
    })
  }
  fetchQuestions(id) {
    this.currentQuestion = id;
    this.fetchResult();
  }
  fetchResult(){
    this.backend.getQuestions(this.currentQuestion).subscribe((val:any) => {
      console.log(val);
      if (val.success == true) {
      }
    })    
  }
}