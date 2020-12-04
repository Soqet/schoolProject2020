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

let ObjectId = mongoose.Types.ObjectId;

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
        request.query['password'] as string
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
        request.query['randomnumber'] as string
      );
      response.send(result);
    });

    this.app.post('/user.getname', async (request, response) => {
      let result = await this.userGetName(
        request.query['username'] as string
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

  async authGetToken(email: string, password: string) {
    try {
      const user = (await this.dbModule.getUserByEmail(email));
      if (!(await this.dbModule.checkPassword(user, password))) throw Error( 'Incorrect password.');
      const token = await this.dbModule.createToken(user);
      return token;
    }catch(error) {
      console.log(error);

      return 'Error';
    }
  }
  
  async authRegister(email: string, password: string, username: string, name: string) {
    try {
      await await this.dbModule.createNewUser(email, password, username, name);
      return '0';
    }catch(error) {
      console.log(error);
      return String(error.message);
    }
  }

  async messagesSend(token: string, username: string, content: string) {
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.send')) throw new ScopeError('Check token scope.');
      let result = this.dbModule.sendMessage(await this.dbModule.getUserByToken(token), username, content);
      return String(result);
    } catch(error) {
      console.log(error);
      return String(error.message);
    }
  }
  
  async messagesGetUnread(token: string) {
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.getunread')) throw new ScopeError('Check token scope.');
      let result;
      return String(result);
    } catch(error) {
      console.log(error);
      return String(error.message);
    }
  } 

  async messagesGetLastMessages(token: string, username: string, numberOfMessagesString: string) {
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.getlastmessages')) throw new ScopeError('Check token scope.');
      const numberofmessages = parseInt(numberOfMessagesString);
      if(!!numberOfMessagesString) throw new Error('Wrong number of messges.');
      let result;
      return String(result);
    } catch(error) {
      console.log(error);
      return String(error.message);
    }
  }

  async messagesGetLastMessage(token: string, username: string) {
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.getlasmessage')) throw new ScopeError('Check token scope.');
      let result;
      return String(result);
    } catch(error) {
      console.log(error);
      return String(error.message);
    }
  }

  async messagesMarkAsRead(token: string, username: string) {
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.markasread')) throw new ScopeError('Check token scope.');
      let result;
      return String(result);
    } catch(error) {
      console.log(error);
      return String(error.message);
    }
  }
  
  async messagesDeleteHistory(token: string, username: string) {
    try {
      if(!this.dbModule.checkStringToken(token, 'messages.deletehistory')) throw new ScopeError('Check token scope.');
      let result;
      return String(result);
    } catch(error) {
      console.log(error);
      return String(error.message);
    }
  }

  async userGetName(username: string) {
    try {
      const result = await this.dbModule.getUserByUsername(username);
      return String(result.toObject().name);
    } catch(error) {
      console.log(error);
      return String(error.message);
    }
  }

  async userGetBlocked(token: string) {
    try {
      if(!this.dbModule.checkStringToken(token, 'user.getblocked')) throw new ScopeError('Check token scope.');
      const result = await this.dbModule.getBlocked(await this.dbModule.getUserByToken(token));
      return String(result);
    } catch(error) {
      console.log(error);
      return String(error.message);
    }
  }

  async userGetDialogues(token: string) {
    try {
      if(!this.dbModule.checkStringToken(token, 'user.getdialogues')) throw new ScopeError('Check token scope.');
      const result = await this.dbModule.getBlocked(await this.dbModule.getUserByToken(token));
      return String(result);
    } catch(error) {
      console.log(error);
      return String(error.message);
    }
  }

  async userChangeName(token: string, currentName: string, newName: string) {
    try{  
      if(!this.dbModule.checkStringToken(token, 'user.changename')) throw new ScopeError('Check token scope.');
      let result = await this.dbModule.changeNameSafe(token, currentName, newName);
      return result;
    } catch(error) {
      console.log(error)
      return String(error.message);
    }
  }

  
  async userChangePassword(token: string, currentPassword: string, newPassword: string) {
    try{
      if(!this.dbModule.checkStringToken(token, 'user.changepassword')) throw new ScopeError('Check token scope.');
      let result = await this.dbModule.changePasswordSafe(token, currentPassword, newPassword);
      return result;
    } catch(error) {
      console.log(error)
      return String(error.message);
    }
  }
    
  async userBlock(token: string, username: string) {
    try{  
      if(!this.dbModule.checkStringToken(token, 'user.block')) throw new ScopeError('Check token scope.');
      let result = await this.dbModule.blockUser(await this.dbModule.getUserByToken(token), username);
      return result;
    } catch(error) {
      console.log(error)
      return String(error.message);
    }
  }
}