import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
  show: boolean = false;
  hide: boolean = false;
  submitted: boolean = false;
  constructor(public loginService: LoginService, private router: Router) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, , Validators.email]),
      password: new FormControl('', [Validators.required])
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
    this.submitted = true;
    if (form.invalid) {
      this.hide = true
      return;
    }

    this.loginService.loginUser(form).subscribe((res: { message: string; token: string }) => {
      localStorage.setItem('token', res.token);
      this.router.navigate(['home-expensya']);
      this.loginService.show = true;
    })
  }

}
