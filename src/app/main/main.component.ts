import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FileService } from '../services/fileUpload.service';
import { MappingServices } from '../services/mapping.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  errersArray = []

  @ViewChild("fileDropRef", { static: false }) fileDropEl: ElementRef;
  files: any[] = [];
  file: File;
  formData: any;
  MyObject;
  confirmBTN : Boolean = true
  showTable = false

  constructor(private fileService : FileService , private mappingService : MappingServices){

  }

  ngOnInit(){
    this.mappingService.allValue = []
    this.mappingService.header = []
    this.mappingService.foundedValue = []
    this.mappingService.confirmedValue = []
    this.mappingService.notFoundedValue = []
    this.mappingService.reqValue = []
  }

  /**
   * on file drop handler
   */
  onFileDropped($event) {
    console.log($event.target.files[0]);
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  fileBrowseHandler(event) {
    this.formData = new FormData();
    if (event.target.value) {
      this.file = <File>event.target.files[0];
      this.formData.append('file', this.file, this.file.name);
    }
    // reception des données du back
    this.fileService.addFile(this.formData).subscribe((res :({excelJson: object , tab3: string[], tab4: string[], models: string[]})) => {
      console.log(res.excelJson[0])
      console.log(res.tab3)
      console.log(res.tab4)
      this.MyObject = res
      // console.log("et voila les valeur trouver : " + JSON.parse(JSON.stringify(this.MyObject)));
      this.mappingService.allData(this.MyObject.excelJson);
      this.mappingService.headerData(this.MyObject.excelJson[0]);
      this.mappingService.foundedData(this.MyObject.tab3);
      this.mappingService.notFoundedData(this.MyObject.tab4);
      this.mappingService.reqData(this.MyObject.models);
      this.confirmBTN= !this.MyObject.fileClean
      this.errersArray = this.MyObject.caseProblem
      if (this.errersArray.length > 0) {
        this.showTable = true
      }
      // if (!this.MyObject.fileClean) {
      //   alert(`
      //   you have an erruer in this lignes:
      //   ${JSON.stringify(this.MyObject.caseProblem[0].errLigne2)}


      //   `)
      // }
    });
    this.prepareFilesList(event.target.files);
  }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    if (this.files[index].progress < 100) {
      console.log("Upload in progress.");
      return;
    }
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        return;
      } else {
        const progressInterval = setInterval(() => {
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 200);
      }
    }, 1000);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.fileDropEl.nativeElement.value = "";
    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

}
