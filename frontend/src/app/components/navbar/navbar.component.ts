import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  @Input('access') access;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  navigateToAdd() {
    this.router.navigate(['/dashboard/add'])
  }
}
