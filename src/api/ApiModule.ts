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
        request.body['email'] as string, 
        request.body['password'] as string, 
        request.body['username'] as string, 
        request.body['name'] as string
      );
      response.send(result);
    });

    this.app.post('/auth.gettoken', async (request, response) =>{
      let result = await this.authGetToken(
        request.body['email'] as string, 
        request.body['password'] as string,
        request.body['scope'] as string,
        request.body['expiresin'] as string
      );
      response.send(result);
    });

    this.app.post('/user.changename', async (request, response) =>{
      let result = await this.userChangeName(
        request.body['token'] as string, 
        request.body['currentname'] as string,
        request.body['newname'] as string
      );
      response.send(result);
    });

    this.app.post('/user.changepassword', async (request, response) =>{
      let result = await this.userChangePassword(
        request.body['token'] as string, 
        request.body['currentpassword'] as string,
        request.body['newpassword'] as string
      );
      response.send(result);
    });

    this.app.post('/user.block', async (request, response) =>{
      let result = await this.userBlock(
        request.body['token'] as string, 
        request.body['username'] as string
      );
      response.send(result);
    })

    this.app.post('/messages.getlastmessages', async (request, response) =>{
      let result = await this.messagesGetLastMessages(
        request.body['token'] as string
      );
      response.send(result);
    });

    this.app.post('/messages.getlastmessage', async (request, response) =>{
      let result = await this.messagesGetLastMessage(
        request.body['token'] as string, 
        request.body['username'] as string
      );
      response.send(result);
    });

    this.app.post('/messages.deletehistory', async (request, response) =>{
      let result = await this.messagesDeleteHistory(
        request.body['token'] as string, 
        request.body['username'] as string
      );
      response.send(result);
    });

    this.app.post('/messages.markasread', async (request, response) =>{
      let result = await this.messagesMarkAsRead(
        request.body['token'] as string, 
        request.body['username'] as string
      );
      response.send(result);
    });

    this.app.post('/messages.getunread', async (request, response) => {
      let result = await this.messagesGetUnread(
        request.body['token'] as string,
        request.body['username'] as string
      );
      response.send(result);
    });

    this.app.post('/messages.get', async (request, response) => {
      let result = await this.messagesGet(
        request.body['token'] as string, 
        request.body['username'] as string,
        request.body['from'] as string,
        request.body['to'] as string
      );
      response.send(result);
    });

    this.app.post('/messages.send', async (request, response) => {
      let result = await this.messagesSend(
        request.body['token'] as string, 
        request.body['username'] as string,
        request.body['content'] as string
      );
      response.send(result);
    });

    this.app.post('/user.getname', async (request, response) => {
      let result = await this.userGetName(
        request.body['username'] as string
      );
      response.send(result);
    });

    this.app.post('/user.getblocked', async (request, response) => {
      let result = await this.userGetBlocked(
        request.body['token'] as string
      );
      response.send(result);
    });

    this.app.post('/user.getdialogues', async (request, response) => {
      let result = await this.userGetDialogues(
        request.body['token'] as string
      );
      response.send(result);
    });

    this.app.post('/user.validatetoken', async (request, response) => {
      let result = await this.validateToken(
        request.body['token'] as string
      );
      response.send(result);
    });

    this.app.post('/user.getfullinfo', async (request, response) => {
      let result = await this.getFullInfo(
        request.body['token'] as string
      );
      response.send(result);
    });

    this.app.listen(this.port);
    await this.dbModule.setup();
  }

  async getFullInfo(token: string) {
    let response;
    try {
      if(!this.dbModule.checkStringToken(token, 'user.getfullinfo')) throw new ScopeError('Check token scope.');
      let result = await this.dbModule.getFullUserInfo(token);
      response = Response.fromSuccessData(result)
    } catch(error) {
      response = Response.fromError(error);
    }
    return response;
  }

  async validateToken(token: string) {
    let response;
    try {
      let result = await this.dbModule.validateStringToken(token);
      response = Response.fromSuccessData(result)
    } catch(error) {
      response = Response.fromError(error);
    }
    return response;
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
  
  async messagesGetUnread(token: string, username: string) {
    let response;
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.getunread')) throw new ScopeError('Check token scope.');
      const result = await this.dbModule.getUnreadWithUser(
        String((await this.dbModule.getUserByUsername(username)).toObject()._id),
        String((await this.dbModule.getUserByToken(token)).toObject()._id)
      );
      response = Response.fromSuccessData(result)
    } catch(error) {
      console.log(error);
      response = Response.fromError(error);
    }
    return response;
  }

  async messagesGet(token: string, username: string, from: string, to: string) {
    let response;
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.get')) throw new ScopeError('Check token scope.');
      const fromNumber = parseInt(from);
      const toNumber = parseInt(to);
      //console.log(from, to, fromNumber, toNumber);
      if((!fromNumber && fromNumber != 0)  || (!toNumber && toNumber != 0)) {
        throw new DbValueError('Wrong numbers;');
      }
      const result = await this.dbModule.getAllMessages(
        String((await this.dbModule.getUserByToken(token)).toObject()._id),
        String((await this.dbModule.getUserByUsername(username)).toObject()._id),
        fromNumber,
        toNumber
      );
      response = Response.fromSuccessData(result);
    } catch(error) {
      console.log(error);
      response = Response.fromError(error);
    }
    return response;
  }

  async messagesGetLastMessages(token: string) {
    let response: Response;
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.getlastmessages')) throw new ScopeError('Check token scope.');
      let result = await this.dbModule.getOneMessageFromEveryDialogue(await this.dbModule.getUserByToken(token));
      response = Response.fromSuccessData(result);
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
      let result = await this.dbModule.markAsRead(
        (await this.dbModule.getUserByToken(token)).toObject()._id, 
        (await this.dbModule.getUserByUsername(username)).toObject()._id
      )
      response = Response.fromSuccessData(result);
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