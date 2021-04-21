export class MappingServices{
  allValue = []
  header = []
  foundedValue = []
  confirmedValue = []
  notFoundedValue = []
  reqValue : string[] = []

  allData(data){
    this.allValue.push(data)
  }

  headerData(data){
    this.header.push(data)
  }

  foundedData(data){
    this.foundedValue.push(data)
  }

  notFoundedData(data){
    this.notFoundedValue.push(data)
  }

  reqData(data : {_id : number, colHeader: string}[]){
    for (let i = 0; i < data.length; i++) {
      this.reqValue.push(data[i].colHeader)
    }
  }
  
  arrayRemove(arr, value) {
    return arr.filter(function(ele){
        return ele != value;
    });
  }

}
