import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BackendService } from 'src/app/_services/backend.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { DisplaySizeService } from 'src/app/_services/display-size.service';
import {AddSuggestionComponent} from '../../components/add-suggestion/add-suggestion.component';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.component.html',
  styleUrls: ['./dashboard-user.component.css']
})
export class DashboardUserComponent implements OnInit {
  type: string;
  id: string;
  name: string;
  searches = [];
  teachers = [];
  suggestions = [];
  students = [];
  uploads = [];
  constructor(private _store: Store<any>, private route: ActivatedRoute, private router: Router, private backend: BackendService,
    private bottomSheet: MatBottomSheet, private dialog: MatDialog, private display: DisplaySizeService) {
    this.type = this.route.snapshot.paramMap.get('type');
    this._store.select('UserDataReducer').subscribe(data => {
      this.id = data.current_user_view;
      if (this.type == 'student') {
        this.backend.viewStudent(this.id).subscribe((val:any) => {
          if (val.success == true) {
            this.name = val.name
            this.searches = val.searches;
            this.teachers = val.teachers;
            this.suggestions = val.suggestions;
          }
          console.log(val);      
        })    
      } else {
        console.log(this.id);
        this.backend.viewTeacher(this.id).subscribe((val:any) => {
          console.log(val);
          if (val.success == true) {
            this.name = val.name
            this.students = val.students;
            this.uploads = val.uploads;
          }
        })
      }
    });
  }
  ngOnInit(): void {
  }
  addSuggestion(){
    if (this.display.displayType == 'mobile') {
      let ref = this.bottomSheet.open(AddSuggestionComponent);
      ref.afterDismissed().subscribe((data) => {
        if (data) {
          this.backend.addSuggestion(this.id, data.text).subscribe((val: any) => {
            if (val.success == true) {
              this.suggestions.push({
                search: data.text,
              })
            }
          })
        }
      })
    } else {
      let ref = this.dialog.open(AddSuggestionComponent);
      ref.afterClosed().subscribe((data) => {
        this.backend.addSuggestion(this.id, data.text).subscribe((val: any) => {
          if (val.success == true) {
            this.suggestions.push({
              search: data.text,
            })
          }
        })
      })
    }
  }  

}
