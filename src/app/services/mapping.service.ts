export class MappingServices{
  allValue = []
  foundedValue = []
  confirmedValue = []
  notFoundedValue = []

  async addFounded(data){
    this.allValue.push(data)
    console.log("-------------------------");
    console.log(this.allValue[0].content);
    console.log("-------------------------");
    this.foundedValue = await this.allValue[0].content.A
  }
}
