import { Component, OnInit, OnDestroy, ViewChild, InjectionToken } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import {BackendService} from '../../_services/backend.service';
import {AuthService} from '../../_services/auth.service'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  nameError: boolean;
  phoneError: boolean;
  type: string;
  access: string;
  authLogin: string;
  otpSent: boolean;
  phone: FormControl;
  password: FormControl;
  name: FormControl;
  otp: FormControl;

  fetchedResponse = true;
  typeSubscription: Subscription;
  constructor(private route: ActivatedRoute, private router: Router, private backend: BackendService, private auth: AuthService) {
    this.type = this.route.snapshot.paramMap.get('type');
    this.access = this.route.snapshot.queryParamMap.get('access') || 'student';

    this.otpSent = false;
    this.authLogin = 'password';

    this.otp = new FormControl('');
    this.phone = new FormControl('');
    this.password = new FormControl('');
    this.name = new FormControl('');
  }

  toggleLoginType() {
    if (this.authLogin == 'password') this.authLogin = 'otp';
    else this.authLogin = 'password';
  }
  takeAction() {
    this.nameError = false;
    this.phoneError = false;
    if (this.type == 'login') {
      if (this.authLogin == 'password') {
        if (this.isEmpty(this.phone.value)) {
          this.phoneError = true;        
          return;
        }
        this.fetchedResponse = false;
        this.backend.login(this.access, this.phone.value, this.password.value).subscribe((response: any) => {
          if (response.success == true) {
            this.auth.setToken(response.access_token);
            this.auth.setUser(response.name, this.access);
            this.fetchedResponse = true;
            this.router.navigate(['/dashboard']);
          }  
          console.log(response);
        })
      } else {
        if (this.otpSent == true) {
          this.fetchedResponse = false;
          this.backend.verifyOTP(this.access, this.phone.value, this.otp.value).subscribe((val: any) => {
            if (val.success == true) {
              this.auth.setToken(val.access_token);
              this.auth.setUser(this.name.value, this.access);
              this.router.navigate(['/dashboard']);              
            }
            this.fetchedResponse = true;
          })
        } else {
          if (this.isEmpty(this.phone.value)) {
            this.phoneError = true;        
            return;
          }
          this.fetchedResponse = false;
          this.backend.getOTP(this.access, this.phone.value).subscribe((val: any) => {
            console.log(val);
            if (val.success  == true) {
              this.otpSent = true;
              this.phone.disable();
            }
            this.fetchedResponse = true;
          })
        }
      }
    } else {
      if (this.isEmpty(this.name.value)) {
        this.nameError = true;      
        return;
      }
      if (this.isEmpty(this.phone.value)) {
        this.phoneError = true;        
        return;
      }
      this.fetchedResponse = false;
      this.backend.signup(this.name.value, this.access, this.phone.value, this.password.value).subscribe((response: any) => {
        if (response.success == true) {
          this.auth.setToken(response.access_token);
          this.auth.setUser(this.name.value, this.access);
          this.fetchedResponse = true;
          this.router.navigate(['/dashboard']);
        }
        console.log(response);
      });
    }
    setTimeout(() => {
      this.nameError = false;
      this.phoneError = false;
    }, 4000);
  }
  isEmpty(value) {
    return (value == '' || value == undefined || value == null) ? true : false;
  }
  ngOnInit(): void {
    this.typeSubscription = this.route.paramMap.subscribe((value) => {
      if (value.get('type') != this.type) this.type = value.get('type');
      if (this.type == 'signup') {
        this.otpSent = false;
        this.authLogin = 'password';       
      }
    });
    this.otpSent = false;
    this.authLogin = 'password';
  }

  ngOnDestroy() {
    this.typeSubscription.unsubscribe();
  }
}
