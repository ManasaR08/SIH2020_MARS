import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  opened: boolean;
  name: string;
  access: string;
  constructor(private _store: Store<any>) {
    this._store.select('UserStateReducer').subscribe(data => {
      console.log(data);
      this.name = data.name;
      this.access = data.access;
    });
    this.opened = false;
  }

  ngOnInit(): void {
  }

}
