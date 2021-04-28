import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  filesUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {
  }


  addFile(data) {
    return this.http.post(this.filesUrl + "file/upload-single/", data );
  }
  postFile(data) {
    return this.http.post(this.filesUrl + "file/JSONfile/", data);
  }

  getUsers(){
    return this.http.get(this.filesUrl + "file/getAllUsers/");
  }

}
