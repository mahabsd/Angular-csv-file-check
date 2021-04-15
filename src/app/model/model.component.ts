import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ModelService } from '../services/model.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit {
  model: Object;
  newcolHead;
  modelform;
  show: boolean;
  constructor(private modelService: ModelService) { }

  ngOnInit() {
    this.show = false;
    this.modelform = new FormGroup({
      colHeader: new FormControl('')
    })
    this.getModel()
  }
  getModel() {
    this.modelService.getAllModels().subscribe(res => this.model = res)
  }
  add(newcolHeader) {
    this.modelService.addModel(newcolHeader).subscribe(res =>console.log(res))
    this.modelform = new FormGroup({
      colHeader: new FormControl('')
    })
    this.getModel() 
  }
  delete(id) {
    this.modelService.deleteModel(id).subscribe(res =>console.log(res))
    this.getModel() 
  }
  update(id, updatedModel) {
    this.modelService.updateModel(id, updatedModel).subscribe(res =>console.log(res))
    this.modelform = new FormGroup({
      colHeader: new FormControl('')
    })
    this.show = false
    this.getModel() 
  }
}
