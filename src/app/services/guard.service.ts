import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GuardService {
  isLoginSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  constructor() { }
  
  logout(): void {
    localStorage.removeItem('token');
    this.isLoginSubject.next(false);
  }
  public getToken(): string {
    return localStorage.getItem('token');
  }


  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (token === null) {
      return false;
    } else {
      return true;
    }

  }
}
