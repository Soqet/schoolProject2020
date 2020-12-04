
export enum responseTypes {
  successWithData = 0,
  errorWtihouData = 1,
  successWithoutData = 2,
  errorWithData = 3
}

export interface IResponse {
  readonly description?: string,
  readonly isSuccess: boolean,
  readonly data?: any;
  readonly type: responseTypes
}

export class Response implements IResponse {

  public readonly description?: string;
  public readonly isSuccess: boolean;
  public readonly type: responseTypes;
  public readonly data?: any;

  constructor(response: IResponse) {
    this.description = response.description;
    this.isSuccess = response.isSuccess;
    this.type = response.type
    this.data = response.data;
  }

  static fromError(error: Error) {
    const response: IResponse = {
      description: `${error.name}: ${error.message}`,
      isSuccess: false,
      type: responseTypes.errorWtihouData,
    }
    return new this(response);
  }

  static fromData(description: string, isSuccess: boolean, code: responseTypes, data?: any) {
    const response: IResponse = {
      description: description,
      isSuccess: isSuccess,
      type: code,
      data: data
    }
    return new this(response);
  }

  static fromSuccessData(data?: any) {
    const response: IResponse = {
      isSuccess: true,
      type: responseTypes.successWithData,
      data: data
    }
    return new this(response);
  }

  /*public toString() {
    let result = { type: this.type, isSuccess: this.isSuccess }
    if (this.description != undefined) {
      result['description'] = this.description;
    }
    
  }*/

}