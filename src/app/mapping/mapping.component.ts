import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { MappingServices } from '../services/mapping.service';
import FuzzySet from 'fuzzyset.js'
import { FileService } from '../services/fileUpload.service';
import { element } from 'protractor';
import { Router } from '@angular/router';



@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss']
})
export class MappingComponent implements OnInit {
  founded: any[];
  notFounded: any[];
  possibleChoices: any[] = [];
  notTranslate: any[] = [];
  translate: any[] = [];
  fuzzyArray: { word: string, proposition: string, sim: any }[] = [];
  notFoundFuzzy = [];
  mappedWord: { myInput: string, correctValue: string }[] = [];
  Lienfichier: any;
  ConfirmClicked = true;
  reqValue: any;

  fileClean: boolean = false
  showButton: boolean = false;

  constructor(private mappingService: MappingServices, private fileService: FileService, private router: Router) {
  }


  ngOnInit() {
    this.founded = this.mappingService.foundedValue;
    this.notFounded = this.mappingService.notFoundedValue;
    this.possibleChoices = this.mappingService.reqValue;
    this.translate = this.mappingService.traslatedValue;
    this.notTranslate = this.mappingService.notTranslatedValue;
    this.reqValue = this.mappingService.reqValue;

    for (let i = 0; i < this.founded[0].length; i++) {
      this.possibleChoices = this.mappingService.arrayRemove(this.possibleChoices, this.founded[0][i])

    }
    this.myFuzzyFunction()
    this.ConfirmClicked = true;
  }


  ////////////
  // version 1 : in case the traduction module won't work
  // /////////////

  // myFuzzyFunction() {
  //   console.log("my array of the possible choices");
  //   console.log(this.mappingService.reqValue);

  //   this.notFounded[0].forEach(element => {
  //     var foundOne = false
  //     var myObject: { word: string, proposition: string, sim: any } = { word: element, proposition: "", sim: 0 }
  //     for (let i = 0; i < this.mappingService.reqValue.length; i++) {

  //       var refTab = FuzzySet([this.mappingService.reqValue[i]], false);

  //       var testedValue = refTab.get(element);


  //       if (testedValue == null) {
  //         console.log("i did not found this one");

  //       }

  //       else if ((testedValue[0][0]).toFixed(4) * 100 > myObject.sim) {
  //         var arrond = Math.round((testedValue[0][0]) * 100)
  //         myObject = { word: element, proposition: testedValue[0][1], sim: arrond }
  //         foundOne = true

  //       }
  //     }

  //     if (foundOne) {
  //       this.fuzzyArray.push(myObject);
  //     }
  //     else {
  //       this.notFoundFuzzy.push(element)
  //     }
  //   });

  // }

  /////////////////////
  // version 2
  ///////////////////

  myFuzzyFunction() {
    this.translate[0].forEach(element => {
      var position = this.translate[0].indexOf(element)
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
          myObject = { word: this.notTranslate[0][position], proposition: testedValue[0][1], sim: arrond }
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


  //////////////////
  // end version 2
  //////////////////




  confirmChoise(obj, selectedhahah, index) {
    if (selectedhahah != 'other') {
      this.founded[0].push(selectedhahah);
      this.mappedWord.push({ myInput: obj, correctValue: selectedhahah });
    }
    else {
      this.mappedWord.push({ myInput: obj, correctValue: selectedhahah });
    }

    this.possibleChoices = this.mappingService.arrayRemove(this.possibleChoices, selectedhahah)

    if (index > 999) {
      this.fuzzyArray.splice(index - 10000, 1)
    }

    else {
      this.notFoundFuzzy.splice(index, 1)
    }

    this.fileClean = this.reqValue.length == this.founded[0].length


  }

  sendData() {
    let tab = []
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
    this.fileService.postFile(tab).subscribe((res: { message }) => {
      this.Lienfichier = res.message
      this.showButton = true

    }
    )
    this.ConfirmClicked = false
  }


}


