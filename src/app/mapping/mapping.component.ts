import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MappingServices } from '../services/mapping.service';
import FuzzySet from 'fuzzyset.js'



@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {
  founded: string[];
  notFounded: any[];
  possibleChoices: any[];
  PropSelected:any;
  fuzzyArray : {word:string, proposition:string, sim: any}[] = []
  notFoundFuzzy = []


  constructor(private mappingService: MappingServices) {
  }


  ngOnInit() {
    this.founded = this.mappingService.foundedValue;
    this.notFounded = this.mappingService.notFoundedValue;
    this.possibleChoices = this.mappingService.reqValue;

    for (let i = 0; i < this.founded[0].length; i++) {
      // console.log("am working on this founded i this.founded " + this.founded[0][i]);
      this.possibleChoices = this.mappingService.arrayRemove(this.possibleChoices, this.founded[0][i])
      // console.log("and the possible choices are know " + this.possibleChoices);
    }
    this.myFuzzyFunction()

  }
  
  

  myFuzzyFunction(){
    console.log("my array of the possible choices");
    console.log(this.mappingService.reqValue);

    this.notFounded[0].forEach(element => {
      console.log("am working with this element : ");
      console.log(element);
      console.log("------------------------------------");
      var foundOne = false
      var myObject : {word:string, proposition:string, sim: any} = {word:element, proposition:"", sim: 0}
      for (let i = 0; i < this.mappingService.reqValue.length; i++) {

        console.log("the possible choice know is :");
        console.log(this.mappingService.reqValue[i]);
        console.log("----------------------------");

        var refTab = FuzzySet([this.mappingService.reqValue[i]], false);

        var testedValue = refTab.get(element);
        console.log("the array of the tested value : ");
        console.log(testedValue);
        console.log("----------------------------------------");


        if (testedValue == null) {
          console.log("i did not found this one");

        }

        else if ((testedValue[0][0]).toFixed(4)*100> myObject.sim) {
          var arrond = (testedValue[0][0]).toFixed(4) * 100
          myObject = {word:element, proposition:testedValue[0][1], sim: arrond}
          console.log("my object know look like this :");
          console.log("***************************");
          console.log(myObject);
          console.log("***************************");
          foundOne = true

        }
      }

      if (foundOne) {
        console.log("yesss i found one");
        this.fuzzyArray.push(myObject);
      }
      else{
        console.log("nooooooooooooo i didn't found one");
        this.notFoundFuzzy.push(element)
      } 
    });

  }
  confirmChoise(i){
    const SelectedLine=this.fuzzyArray[i]
    var position=0;
    const header=this.mappingService.header[0]
    var headerValues=Object.values(header)
    var headerKey=Object.keys(header) 
    console.log("the global header:",header);
    console.log("----------------------------------------");
    
    for(let i=0;i<headerValues.length;i++){
      if(headerValues[i]==SelectedLine.word){
        position=i;
      }
    }
    
    var KeySelection=headerKey[position];
   
    header[KeySelection]=this.PropSelected
     console.log(header);
       
  this.PropSelected='';

  }


}
