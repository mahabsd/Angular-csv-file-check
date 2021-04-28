import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/fileUpload.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent implements OnInit {
  myArray :any
  constructor(private fileService : FileService, private usersService : UsersService) { }

  ngOnInit() {
    this.fileService.getUsers().subscribe(res=>{
      this.myArray = res
    })
  }

  getUsers(i){
    this.usersService.singleUser = this.myArray[i];
  }

}
