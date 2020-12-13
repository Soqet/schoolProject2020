import express, { request, response } from 'express';
import { Express } from 'express';
import { 
  hash,
  compare
} from 'bcrypt';
import 'dotenv/config';
import DbModule from '../db/DbModule';
//modlels start
import userModel from '../db/models/userModel';
import tokenModel from '../db/models/tokenModel';
import messageModel from '../db/models/messagesModel';
import conversationModel from '../db/models/conversationModel';
//modles end
import mongoose from 'mongoose';
import {  
  DbError,
  DbIdError,
  DbValueError,
  ScopeError 
} from '../Errors';
import {
  IResponse,
  Response,
  responseTypes
} from './Response'
import Scope from '../db/Scope';
import * as bodyParser from 'body-parser';

const ObjectId = mongoose.Types.ObjectId;
const successMessage = 'success';



function loggerMiddleware(request: express.Request, response: express.Response, next: any) {
  console.log(`${request.method} ${request.path}`);

  next();
}

export default class ApiModule{

  private port: number;
  private app: Express;
  private dbModule: DbModule;

  constructor(port: number, dbModule: DbModule){
    this.port = port;
    this.app = express();
    this.dbModule = dbModule;
  }

  async setup() {
    //this.app.use(express.json());
    this.app.use(loggerMiddleware);
    this.app.use(bodyParser.urlencoded({ 'extended':true }));
    this.app.use(bodyParser.json());

    this.app.post('/auth.register', async (request, response) =>{
      let result = await this.authRegister(
        request.query['email'] as string, 
        request.query['password'] as string, 
        request.query['username'] as string, 
        request.query['name'] as string
      );
      response.send(result);
    });

    this.app.post('/auth.gettoken', async (request, response) =>{
      let result = await this.authGetToken(
        request.query['email'] as string, 
        request.query['password'] as string,
        request.query['scope'] as string,
        request.query['expiresin'] as string
      );
      response.send(result);
    });

    this.app.post('/user.changename', async (request, response) =>{
      let result = await this.userChangeName(
        request.query['token'] as string, 
        request.query['currentname'] as string,
        request.query['newname'] as string
      );
      response.send(result);
    });

    this.app.post('/user.changepassword', async (request, response) =>{
      let result = await this.userChangePassword(
        request.query['token'] as string, 
        request.query['currentpassword'] as string,
        request.query['newpassword'] as string
      );
      response.send(result);
    });

    this.app.post('/user.block', async (request, response) =>{
      let result = await this.userBlock(
        request.query['token'] as string, 
        request.query['username'] as string
      );
      response.send(result);
    })

    this.app.post('/messages.getlastmessages', async (request, response) =>{
      let result = await this.messagesGetLastMessages(
        request.query['token'] as string, 
        request.query['username'] as string,
        request.query['numberofmessages'] as string
      );
      response.send(result);
    });

    this.app.post('/messages.getlastmessage', async (request, response) =>{
      let result = await this.messagesGetLastMessage(
        request.query['token'] as string, 
        request.query['username'] as string
      );
      response.send(result);
    });

    this.app.post('/messages.deletehistory', async (request, response) =>{
      let result = await this.messagesDeleteHistory(
        request.query['token'] as string, 
        request.query['username'] as string
      );
      response.send(result);
    });

    this.app.post('/messages.markasread', async (request, response) =>{
      let result = await this.messagesMarkAsRead(
        request.query['token'] as string, 
        request.query['username'] as string
      );
      response.send(result);
    });

    this.app.post('/messages.getunread', async (request, response) => {
      let result = await this.messagesGetUnread(
        request.query['token'] as string
      );
      response.send(result);
    });

    this.app.post('/messages.send', async (request, response) => {
      let result = await this.messagesSend(
        request.query['token'] as string, 
        request.query['username'] as string,
        request.query['content'] as string
      );
      response.send(result);
    });

    this.app.post('/user.getname', async (request, response) => {
      let result = await this.userGetName(
        request.body['username'] as string
      );
      response.send(result);
    })

    this.app.post('/user.getblocked', async (request, response) => {
      let result = await this.userGetBlocked(
        request.query['token'] as string
      );
      response.send(result);
    })

    this.app.post('/user.getdialogues', async (request, response) => {
      let result = await this.userGetDialogues(
        request.query['token'] as string
      );
      response.send(result);
    })

    this.app.listen(this.port);
    await this.dbModule.setup();
  }

  async authGetToken(email: string, password: string, scope: string, expiresIn: string) {
    let response;
    try {
      const user = (await this.dbModule.getUserByEmail(email));
      if (!(await this.dbModule.checkPassword(user, password))) throw Error( 'Incorrect password.');
      var intScope: undefined | Scope = new Scope(parseInt(scope));
      var intExpiresIn: undefined | number = parseInt(expiresIn);
      if (!intScope) {
        intScope = undefined;
      }
      if (!intExpiresIn) {
        intExpiresIn = undefined;
      }
      console.log(scope, expiresIn, intExpiresIn, intScope);
      const data = await this.dbModule.createToken(user, intScope, intExpiresIn);
      response = Response.fromSuccessData(data);
    }catch(error) {
      console.log(error);
      response = Response.fromError(error);
    }
    return response;
  }
  
  async authRegister(email: string, password: string, username: string, name: string) {
    let response: Response;
    try {
      await this.dbModule.createNewUser(email, password, username, name);
      response = Response.fromSuccessData();
    }catch(error) {
      console.log(error);
      response = Response.fromError(error);
    }
    return response;
  }

  async messagesSend(token: string, username: string, content: string) {
    let response;
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.send')) throw new ScopeError('Check token scope.');
      let message = await this.dbModule.sendMessage(await this.dbModule.getUserByToken(token), username, content);
      response = Response.fromSuccessData();
    } catch(error) {
      console.log(error);
      response = Response.fromError(error.message);
    }
    return response;
  }
  
  async messagesGetUnread(token: string) {
    let response;
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.getunread')) throw new ScopeError('Check token scope.');
      response = Response.fromSuccessData()
    } catch(error) {
      console.log(error);
      return String(error.message);
    }
    return response;
  } 

  async messagesGetLastMessages(token: string, username: string, numberOfMessagesString: string) {
    let response: Response;
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.getlastmessages')) throw new ScopeError('Check token scope.');
      const numberofmessages = parseInt(numberOfMessagesString);
      if(!!numberOfMessagesString) throw new Error('Wrong number of messges.');
      let result = '';
      response = Response.fromSuccessData();
    } catch(error) {
      console.log(error);
      response = Response.fromError(error);
    }
    return response;
  }

  async messagesGetLastMessage(token: string, username: string) {
    let response: Response;
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.getlasmessage')) throw new ScopeError('Check token scope.');
      let result = successMessage; // function here
      response = Response.fromSuccessData();
    } catch(error) {
      console.log(error);
      response = Response.fromError(error);
    }
    return response;
  }

  async messagesMarkAsRead(token: string, username: string) {
    let response: Response;
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.markasread')) throw new ScopeError('Check token scope.');
      let result = successMessage; //function here
      response = Response.fromSuccessData();
    } catch(error) {
      console.log(error);
      response = Response.fromError(error);
    }
    return response;
  }
  
  async messagesDeleteHistory(token: string, username: string) {
    let response: Response;
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.deletehistory')) throw new ScopeError('Check token scope.');
      let result = successMessage; //function here
      response = Response.fromSuccessData();
      return String(result);
    } catch(error) {
      console.log(error);
      response = Response.fromError(error);
    }
    return response;
  }

  async userGetName(username: string) {
    let response: Response;
    try {
      const result = await this.dbModule.getUserByUsername(username);
      response = Response.fromSuccessData(result.toObject().name);
    } catch(error) {
      console.log(error);
      response = Response.fromError(error);
    }
    return response;
  }

  async userGetBlocked(token: string) {
    let response: Response;
    try {
      if(!this.dbModule.checkStringToken(token, 'user.getblocked')) throw new ScopeError('Check token scope.');
      const result = await this.dbModule.getBlocked(await this.dbModule.getUserByToken(token));
      response = Response.fromSuccessData();
    } catch(error) {
      console.log(error);
      response = Response.fromError(error);
    }
    return response;
  }

  async userGetDialogues(token: string) {
    let response: Response;
    try {
      if(!this.dbModule.checkStringToken(token, 'user.getdialogues')) throw new ScopeError('Check token scope.');
      const data = await this.dbModule.getDialogues(await this.dbModule.getUserByToken(token));
      response = Response.fromSuccessData(data);
    } catch(error) {
      console.log(error);
      response = Response.fromError(error);
    }
    return response;
  }

  async userChangeName(token: string, currentName: string, newName: string) {
    let response: Response;
    try{  
      if(!this.dbModule.checkStringToken(token, 'user.changename')) throw new ScopeError('Check token scope.');
      const data = await this.dbModule.changeNameSafe(token, currentName, newName);
      response = Response.fromSuccessData(data);
    } catch(error) {
      console.log(error)
      response = Response.fromError(error);
    }
    return response;
  }

  
  async userChangePassword(token: string, currentPassword: string, newPassword: string) {
    let response: Response;
    try{
      if(!this.dbModule.checkStringToken(token, 'user.changepassword')) throw new ScopeError('Check token scope.');
      const data = await this.dbModule.changePasswordSafe(token, currentPassword, newPassword);
      response = Response.fromSuccessData(data);
    } catch(error) {
      console.log(error)
      response = Response.fromError(error);
    }
    return response;
  }
    
  async userBlock(token: string, username: string) {
    let response: Response;
    try{  
      if(!this.dbModule.checkStringToken(token, 'user.block')) throw new ScopeError('Check token scope.');
      const data = await this.dbModule.blockUser(await this.dbModule.getUserByToken(token), username);
      response = Response.fromSuccessData(data);
    } catch(error) {
      console.log(error)
      response = Response.fromError(error);
    }
    return response;
  }
}