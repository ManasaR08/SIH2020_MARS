import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-result',
  templateUrl: './dashboard-result.component.html',
  styleUrls: ['./dashboard-result.component.css']
})
export class DashboardResultComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToAdd() {
    this.router.navigate(['/dashboard/add'])
  }
}
