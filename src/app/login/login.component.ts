import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl('')
    })
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl('')
    })
  }
  submitRegister(form) {
    this.loginService.addUser(form).subscribe()
  }
  submitLogin(form) {
    this.loginService.loginUser(form).subscribe((res:{message: string; token: string})=>{
      localStorage.setItem('token', res.token);
      this.router.navigate(['/']);
    })
  }

}
