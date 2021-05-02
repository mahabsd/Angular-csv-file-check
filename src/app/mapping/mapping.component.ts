import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MappingServices } from '../services/mapping.service';
import FuzzySet from 'fuzzyset.js'
import { FileService } from '../services/fileUpload.service';
import { element } from 'protractor';



@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {
  founded: any[];
  notFounded: any[];
  possibleChoices: any[] = [];
  fuzzyArray: { word: string, proposition: string, sim: any }[] = []
  notFoundFuzzy = []
  mappedWord: { myInput: string, correctValue: string }[] = []
  Lienfichier:any;
  ConfirmClicked=true;
  constructor(private mappingService: MappingServices, private fileService: FileService) {
  }


  ngOnInit() {
    this.founded = this.mappingService.foundedValue;
    this.notFounded = this.mappingService.notFoundedValue;
    this.possibleChoices = this.mappingService.reqValue;

    for (let i = 0; i < this.founded[0].length; i++) {
      // console.log("am working on this founded i this.founded " + this.founded[0][i]);
      this.possibleChoices = this.mappingService.arrayRemove(this.possibleChoices, this.founded[0][i])
      // console.log("and the possible choices are know ");
      // console.log(this.possibleChoices);
    }
    this.myFuzzyFunction()
 this.ConfirmClicked=true;
  }



  myFuzzyFunction() {
    console.log("my array of the possible choices");
    console.log(this.mappingService.reqValue);

    this.notFounded[0].forEach(element => {
      var foundOne = false
      var myObject: { word: string, proposition: string, sim: any } = { word: element, proposition: "", sim: 0 }
      for (let i = 0; i < this.mappingService.reqValue.length; i++) {

        var refTab = FuzzySet([this.mappingService.reqValue[i]], false);

        var testedValue = refTab.get(element);


        if (testedValue == null) {
          console.log("i did not found this one");

        }

        else if ((testedValue[0][0]).toFixed(4) * 100 > myObject.sim) {
          var arrond = Math.round((testedValue[0][0]) * 100)
          myObject = { word: element, proposition: testedValue[0][1], sim: arrond }
          foundOne = true

        }
      }

      if (foundOne) {
        this.fuzzyArray.push(myObject);
      }
      else {
        this.notFoundFuzzy.push(element)
      }
    });

  }

  confirmChoise(obj, selectedhahah, index) {
    console.log(obj);

    if (selectedhahah != 'other') {
      this.founded[0].push(selectedhahah);
      this.mappedWord.push({ myInput: obj, correctValue: selectedhahah });
    }

    else{
      this.mappedWord.push({ myInput: obj, correctValue: selectedhahah });
      console.log("my mappedWord");

      console.log(this.mappedWord);

    }

    this.possibleChoices = this.mappingService.arrayRemove(this.possibleChoices, selectedhahah)

    if (index > 999) {
      this.fuzzyArray.splice(index - 10000, 1)
    }

    else {
      this.notFoundFuzzy.splice(index, 1)
    }

  }

  sendData() {
    let tab = []
    let data = {
      data1: this.mappedWord,
      data2: this.mappingService.allValue
    }
    this.mappingService.allValue.forEach(element => {
      for (const [key, value] of Object.entries(element[0])) {
        this.mappedWord.forEach(word => {
          if (word.myInput == value) {
            element[0][key] = word.correctValue
          }
        })
      }
      tab.push(element)
    });
    console.log(tab);

    this.fileService.postFile(tab).subscribe(res => { this.Lienfichier=res}
    )
    this.ConfirmClicked=false
}

}
