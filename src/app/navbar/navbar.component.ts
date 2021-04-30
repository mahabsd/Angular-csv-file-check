import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  show = false
  constructor(public loginShow: LoginService) {
    this.show = this.loginShow.show 
    if (localStorage.getItem('token')) {
      this.show = true
    }
  }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.show = true
    }
  }
  logout(): void {
    localStorage.removeItem('token');
    this.show = false
  }


}
