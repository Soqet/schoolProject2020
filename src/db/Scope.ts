import { ScopeError } from "../Errors";

export enum ScopeBytes  {
  fullScope = (1 << 4) - 1,
  defaultScope = (1 << 4) - 1,
  getInfo = 1 << 0,
  sendMessages = 1 << 1,
  readMessages = 1 << 2,
  changeInfo = 1 << 3
}

/*enum Methods {
  userGetName = 'user.getname',
  userChangeName = 'user.changename',
  userChangePassword = 'user.changepassword',
  messagesSend = 'messages.send',
  messagesDeleteHistory = 'messages.deletehistory',
  'messages.block',
  'messages.getunread',
  'messages.markasread',
  'messages.getlastmessages',
  'messages.getlastmessage'
} 


private ApiMethods: {
    user.getname:  ScopeBytes.getInfo}
    'user.changename': ScopeBytes.changeInfo,
    'user.changepassword': ScopeBytes.changeInfo,
     'messages.send': ScopeBytes.sendMessages,
     'message.deletehistory': ScopeBytes.sendMessages | ScopeBytes.readMessages,
   'message.block': ScopeBytes.sendMessages | ScopeBytes.readMessages,
     'messages.getunread': ScopeBytes.readMessages,
     'messages.markasread': ScopeBytes.readMessages,
     'messages.getlastmessages': ScopeBytes.readMessages,
     'messages.getlastmessage': ScopeBytes.readMessages,*/

interface ScopeMethods {
  methodName: string,
  methodScope: number
}
    

export default class Scope {

  /*private ApiMethods = {
    'user.getname':  ScopeBytes.getInfo,
    'user.changename': ScopeBytes.changeInfo,
    'user.changepassword': ScopeBytes.changeInfo,
    'messages.send': ScopeBytes.sendMessages,
    'message.deletehistory': ScopeBytes.sendMessages | ScopeBytes.readMessages,
    'message.block': ScopeBytes.sendMessages | ScopeBytes.readMessages,
    'messages.getunread': ScopeBytes.readMessages,
    'messages.markasread': ScopeBytes.readMessages,
    'messages.getlastmessages': ScopeBytes.readMessages,
    'messages.getlastmessage': ScopeBytes.readMessages,
  }*/
  private ApiMethods: Array<ScopeMethods> = [
    {methodName: 'user.getname', methodScope: ScopeBytes.getInfo},
    {methodName: 'user.changename', methodScope: ScopeBytes.changeInfo},
    {methodName: 'user.changepassword', methodScope: ScopeBytes.changeInfo},
    {methodName: 'messages.send', methodScope: ScopeBytes.sendMessages},
    {methodName: 'message.deletehistory', methodScope: ScopeBytes.sendMessages | ScopeBytes.readMessages},
    {methodName: 'message.block', methodScope: ScopeBytes.sendMessages | ScopeBytes.readMessages},
    {methodName: 'messages.getunread', methodScope: ScopeBytes.readMessages},
    {methodName: 'messages.markasread', methodScope: ScopeBytes.readMessages},
    {methodName: 'messages.getlastmessages', methodScope: ScopeBytes.readMessages},
    {methodName: 'messages.getlastmessage', methodScope: ScopeBytes.readMessages},
    {methodName: 'user.getblocked', methodScope: ScopeBytes.readMessages},
    {methodName: 'user.getdialogues', methodScope: ScopeBytes.readMessages}
  ];
  public scope: number;

  constructor(scope: number) {
    this.scope = scope;
  }

  checkMethod(methodName: string) {
    const methodScope = this.ApiMethods.find((element) => {
      return element.methodName == methodName
    })?.methodScope
    if(methodScope == undefined) throw new ScopeError('Unknown method.');
    return (methodScope & this.scope) == methodScope
  }

}