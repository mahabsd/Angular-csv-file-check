import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MappingServices } from '../services/mapping.service';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {
  founded: any[];
  notFounded: any[];
  possibleChoices :any[];
  confirmedFounded = ["yess1", "yess2", "yess3"];

  constructor(private mappingService : MappingServices) {
  }

  ngOnInit() {
    this.founded = this.mappingService.foundedValue
    console.log(this.founded);
    this.notFounded = this.mappingService.notFoundedValue
    
  }
  // getModel() {
  //   this.modelService.getAllModels().subscribe(res => this.model = res)
  // }

}
