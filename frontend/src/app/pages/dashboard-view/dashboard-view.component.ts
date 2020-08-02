import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from 'src/app/_services/backend.service';
import {Store} from '@ngrx/store';
import { StudentService } from 'src/app/_services/student.service';
import { TeacherService } from '../../_services/teacher.service';
import { MatBottomSheet, MatBottomSheetConfig } from '@angular/material/bottom-sheet';
import { DisplaySizeService } from '../../_services/display-size.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UploadDocumentComponent } from 'src/app/components/upload-document/upload-document.component';
import { LoadingComponent } from 'src/app/components/loading/loading.component';


@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css']
})
export class DashboardViewComponent implements OnInit {
  type: string;
  option1: string;
  option2: string;
  searchesToShow = [];
  searches = [];
  suggestions = [];
  teachers = [];
  suggestedTeachers = [];
  teachersToShow = [];
  uploads = [];
  users = [];
  constructor(private _store: Store<any>, private route: ActivatedRoute, private router: Router, private backend: BackendService,
    private student: StudentService, private teacher: TeacherService, private display: DisplaySizeService, 
    private bottomSheet: MatBottomSheet, private dialog: MatDialog) {
    this.type = this.route.snapshot.paramMap.get('type');
    this.setNavOptions();
    this._store.select('UserDataReducer').subscribe(data => {
      this.searches = data.searches;
      this.suggestions = data.suggestions;
      this.teachers = data.teachers;
      this.suggestedTeachers = data.suggestedTeachers;
      this.users = data.students;
      this.uploads = data.uploads;
      this.searchesToShow =(this.option1 == 'Your searches') ? this.searches : this.suggestions;
      this.teachersToShow = (this.option1 == 'Your teachers') ? this.teachers : this.suggestedTeachers;
    });
    this.setupPage();
  }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((val) => {
      if (this.type != val.get('type')) {
        this.type = val.get('type');
        this.setNavOptions();
        this.setupPage();
      }
    })
  }

  addDocument(){ 
    if (this.display.displayType == 'mobile') {
      this.bottomSheet.open(UploadDocumentComponent);
    } else {
      this.dialog.open(UploadDocumentComponent);
    }
  }
  
  deleteDocument(id) {
    this.teacher.deleteDocument(id);
  }

  navigateToAdd(){
    this.router.navigate(['/dashboard/add'])
  }

  toggle() {
    if (this.option1 == 'Your students') return;
    if (this.type == 'searches') {
      if (this.option1 == 'Your searches') {
        this.searchesToShow = this.suggestions;        
      } else {
        this.searchesToShow = this.searches;
      }
      let temp = this.option2;
      this.option2 = this.option1;
      this.option1 = temp;
      return;
    }
    if (this.type == 'teachers') {
      if (this.option1 == 'Your teachers') {
        this.teachersToShow = this.suggestedTeachers;
      } else {
        this.teachersToShow = this.teachers;
      }
      let temp = this.option2;
      this.option2 = this.option1;
      this.option1 = temp;
      return;
    }
  }

  setupPage() {
    if (this.type =='searches') {
      this.student.getSearchesView();
    } else if (this.type == 'teachers') {
      this.student.getTeachersView();
    } else if (this.type == 'students') {
      this.teacher.getStudentsView();
    } else if (this.type == 'uploads') {
      this.teacher.getUploadsView();
      return;
    }
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
  viewSearchResult(id) {
    console.log(id);
    this.student.viewResult(id);
    this.router.navigate(['/dashboard/result']);
  }
  setNavOptions() {
    if (this.type == 'teachers') {
      this.option1 = 'Your teachers';
      this.option2 = 'Suggested teachers';
    } else if (this.type == 'students') {
      this.option1 = 'Your students';
      this.option2 = '';
    } else if (this.type == 'searches'){
      this.searchesToShow = this.searches;
      this.option1 = 'Your searches';
      this.option2 = 'Suggested content';      
    } else if(this.type == 'uploads') {
      this.option1 = 'Your uploads';
      this.option2 = '';
    }
  }

  joinTeacher(name, id, uploads) {
    this.student.addTeacher(name, id, uploads);
  }

  viewTeacher(id) {
    this._store.dispatch({
      type: 'SET_CURRENT_USER_VIEW',
      payload: id
    });
    this.router.navigate(['/dashboard/user/teacher']);
  }

  viewStudent(id) {
    this._store.dispatch({
      type: 'SET_CURRENT_USER_VIEW',
      payload: id
    });
    this.router.navigate(['/dashboard/user/student']);
  }

  viewQuestions(id) {
    this._store.dispatch({
      type: 'SET_CURRENT_QUESTION',
      payload: id
    });
    this.router.navigate(['/dashboard/questions']);
  }
}
