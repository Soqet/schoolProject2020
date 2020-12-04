interface DbRecord{
  type: string;
  data: object;

}

export default class DbBuffer {

  private buffer: Array<DbRecord>;

  constructor() {
    this.buffer = new Array<DbRecord>();
  }


}