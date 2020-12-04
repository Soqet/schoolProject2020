export enum ErrorName {
  DbError = 'Data base error',
  DbIdError = 'Data base id error',
  DbValueError = 'Data base value error',
  ScopeError = 'Scope error'
}

export class DbError extends Error {
  constructor(message?: string){
    super(message);
    this.name = ErrorName.DbError;
  }
}

export class DbIdError extends DbError {
  constructor(message?: string){
    super(message);
    this.name = ErrorName.DbIdError;
  }
}

export class DbValueError extends DbError {
  constructor(message?: string) {
    super(message);
    this.name = ErrorName.DbValueError;
  }
}

export class ScopeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = ErrorName.ScopeError;
  }
}
