export class MappingServices{
  allValue = []
  header = []
  foundedValue = []
  confirmedValue = []
  notFoundedValue = []
  reqValue : string[] = []

  allData(data){
    this.allValue.push(data)
    console.log("-------------------------");
    console.log("The array of all value : ");
    console.log(this.allValue);
    console.log("-------------------------");
  }

  headerData(data){
    this.header.push(data)
    console.log("-------------------------");
    console.log("The array of the header : ");
    console.log(this.header);
    console.log("-------------------------");
  }

  foundedData(data){
    this.foundedValue.push(data)
    console.log("-------------------------");
    console.log("The array of founded value : ");
    console.log(this.foundedValue);
    console.log("-------------------------");
  }

  notFoundedData(data){
    this.notFoundedValue.push(data)
    console.log("-------------------------");
    console.log("The array of the not founded value : ");
    console.log(this.notFoundedValue);
    console.log("-------------------------");
  }

  reqData(data : {_id : number, colHeader: string}[]){
    for (let i = 0; i < data.length; i++) {
      this.reqValue.push(data[i].colHeader)
    }
    console.log("-------------------------");
    console.log("The array of the rest : ");
    console.log(this.reqValue);
    console.log("-------------------------");
  }


  arrayRemove(arr, value) {

    return arr.filter(function(ele){
        return ele != value;
    });
  }

  

}
