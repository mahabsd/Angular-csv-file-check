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
  getFile(id) {
    return this.http.get(this.filesUrl + "files/file/" + id,);
  }
  updateFile(id, data) {
    return this.http.put(this.filesUrl + "files/file/update/"+ id, data );
  }
  deleteFile(id) {
    return this.http.delete(this.filesUrl + "files/file/delete/" + id, );
  }
  getAllFiles() {
    return this.http.get(this.filesUrl + "files/getAllfiles");
  }
  getAllRoles() {
    return this.http.get(this.filesUrl + "files/getAllRoles");
  }
  updateFileConge(id, data) {
    return this.http.put(this.filesUrl + "files/file/updateConge/"+ id, data );
  }
  // postImage(data){
  //   return this.http.post(this.filesUrl + "files/file/add/", data );
  // }
}
