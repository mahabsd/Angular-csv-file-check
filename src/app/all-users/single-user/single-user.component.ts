import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent implements OnInit {
  singleUser: any

  constructor(private usersService: UsersService) { }

  ngOnInit() {
    this.singleUser = this.usersService.singleUser
    
  }

}
