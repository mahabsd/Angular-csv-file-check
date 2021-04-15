import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  ModelsUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {
  }


  addModel(data) {
    return this.http.post(this.ModelsUrl + "model/add/", data );
  }
  updateModel(id, data) {
    return this.http.put(this.ModelsUrl + "model/update/"+ id, data );
  }
  deleteModel(id) {
    return this.http.delete(this.ModelsUrl + "model/delete/" + id);
  }
  getAllModels() {
    return this.http.get(this.ModelsUrl + "model/getModel");
  }
}
