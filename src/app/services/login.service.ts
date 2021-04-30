import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  show: boolean = false;
  usersUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {
    if (localStorage.getItem('token')) {
      this.show = true
    }
  }


  addUser(data) {
    return this.http.post(this.usersUrl + "user/add/", data);
  }
  loginUser(data) {
    return this.http.post(this.usersUrl + "user/login/", data);
  }
  getUser(id) {
    return this.http.get(this.usersUrl + "user/" + id,);
  }
  getAllUsers() {
    return this.http.get(this.usersUrl + "user/getAllusers");
  }
}
