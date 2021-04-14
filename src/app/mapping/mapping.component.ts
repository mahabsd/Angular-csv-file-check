import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MappingServices } from '../services/mapping.service';

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {
  founded :any[]
  confirmedFounded = ["yess1", "yess2", "yess3"]

  constructor(private mappingService : MappingServices) {
   }

  ngOnInit() {
    this.founded = this.mappingService.foundedValue
    console.log(this.founded);
  }



}
