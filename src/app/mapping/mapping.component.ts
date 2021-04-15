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
  bla

  constructor(private mappingService : MappingServices) {
  }

  ngOnInit() {
    this.founded = this.mappingService.foundedValue;
    console.log(this.founded);
    this.notFounded = this.mappingService.notFoundedValue;
    this.possibleChoices = this.mappingService.reqValue;
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa ");
    console.log(this.founded[0][1]);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaa " );

    for (let i = 0; i < this.founded[0].length; i++) {
      console.log("am working on this founded i this.founded " + this.founded[0][i]);
      this.possibleChoices = this.mappingService.arrayRemove(this.possibleChoices, this.founded[0][i])
      console.log("and the possible choices are know " + this.possibleChoices);
    }
  }


}
