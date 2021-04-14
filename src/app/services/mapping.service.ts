export class MappingServices{
  allValue = []
  header = []
  foundedValue = []
  confirmedValue = []
  notFoundedValue = []

  allData(data){
    this.allValue.push(data)
    // console.log("-------------------------");
    // console.log(this.allValue);
    // console.log("-------------------------");
  }

  headerData(data){
    this.header.push(data)
    // console.log("-------------------------");
    // console.log(this.header);
    // console.log("-------------------------");
  }

  foundedData(data){
    this.foundedValue.push(data)
    // console.log("-------------------------");
    // console.log(this.foundedValue);
    // console.log("-------------------------");
  }

  notFoundedData(data){
    this.notFoundedValue.push(data)
    // console.log("-------------------------");
    // console.log(this.notFoundedValue);
    // console.log("-------------------------");
  }




}
