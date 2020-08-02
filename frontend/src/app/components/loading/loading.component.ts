import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  display = [
    {
      text: 'Aeroplane',
      image: 'assets/images/plane.png'
    },
    {
      text: 'Groceries',
      image: 'assets/images/grocery.png',
    },
    {
      text: 'Elephant',
      image: 'assets/images/elephant.png'
    }
  ]
  index = 0;
  constructor() {
    setInterval(() => {
      this.index += 1;
      if (this.index == 3) {
        this.index = 0;
      }
    }, 3000);
  }

  ngOnInit(): void {
  }

}
