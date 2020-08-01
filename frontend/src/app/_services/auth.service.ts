import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  accessToken: string;
  constructor(private _store: Store<any>) {
    this.accessToken = '';
  }

  setToken(token) {
    this.accessToken = token;
    this._store.dispatch({
      type: 'SET_TOKEN',
      payload: token,
    });
  }

  setUser(name, access) {
    this._store.dispatch({
      type: 'SET_USER',
      payload: {name: name, access: access},
    });
  }

  isAuthenticated() {
    if (this.accessToken != '' && this.accessToken != undefined && this.accessToken != null) return true;
    // this.getRefeshToken();
    // if (this.accessToken != '' && this.accessToken != undefined && this.accessToken != null) return true;
    return false;
  }

  fetchToken() {
    return this.accessToken;
  }

  logout() {
    delete this.accessToken;
    this._store.dispatch({
      type: 'RESET_USER_STATE',
      payload: {},
    });    
  }
}
