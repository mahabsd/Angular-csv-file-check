import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  show = false
  constructor() { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.show = true
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    this.show=false
  }


}
