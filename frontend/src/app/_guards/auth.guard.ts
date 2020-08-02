import { Injectable } from '@angular/core';
import { Router, CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.auth.logout();
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
  canActivateChild() {
    if (!this.auth.isAuthenticated()) {
      this.auth.logout();
      this.router.navigate(['/auth/login']);
      return false;
    }
    return true;
  }
}