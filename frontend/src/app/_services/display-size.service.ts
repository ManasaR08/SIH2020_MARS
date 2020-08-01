import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisplaySizeService {
  displayType: string;

  constructor() {
    this.setSize(window.innerWidth);
  }

  setSize(num: number) {
    if(num < 850) {
      this.displayType = 'mobile';
    } else {
      this.displayType = 'desktop'
    }
  }
}
