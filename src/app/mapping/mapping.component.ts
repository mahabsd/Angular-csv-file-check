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
  possibleChoices :any[];
  confirmedFounded = ["yess1", "yess2", "yess3"];
  Reference=["FirstName","LastName","Language","PayId","PayId1"]
  maxMatch:any[]=[];
  maxMatchWord:string[]=[];
  constructor(private mappingService : MappingServices) {
  }

  ngOnInit() {
    this.founded = this.mappingService.foundedValue;
    this.notFounded = this.mappingService.notFoundedValue;
    this.possibleChoices = this.mappingService.reqValue;

    for (let i = 0; i < this.founded[0].length; i++) {
      console.log("am working on this founded i this.founded " + this.founded[0][i]);
      this.possibleChoices = this.mappingService.arrayRemove(this.possibleChoices, this.founded[0][i])
      console.log("and the possible choices are know " + this.possibleChoices);
    }
    this.matchingWord()
  }
matchingWord(){
let i=0;
var valeur=0;
var word:string='';
const fuzzyArray=[]
  const matchingWords=FuzzySet(this.Reference,false)
 
    const long=this.founded[0].length;
    
   this.founded.forEach(element=>{
     for(i=0;i<long;i++)  {
    const matchingTab =matchingWords.get(element[i]) 
    fuzzyArray.push(matchingTab)
   
  }
  console.log(fuzzyArray);
  
    fuzzyArray.forEach(aray=>{
      valeur=0;

   aray.forEach(element => {
    if(element[0]>valeur){
      valeur=element[0]
      word=element[1]
      this.maxMatch.push(valeur)
      this.maxMatchWord.push(word)
    }

  });
  })
   console.log(this.maxMatch);
   console.log(this.maxMatchWord);

   })

   
}

}
