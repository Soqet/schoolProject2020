# Simple messenger api.
Special thanks to [Danila Kurlikov](https://github.com/KurlykovDanila) for making android app.

## Methods

| method name   | arguments  | return value | description |
|:------------- |:---------------| :-------------| :------------|
| auth.register | email, password, username, name | - |creates account | 
|auth.gettoken      | email, password, scope?, expiresin?      | token | creates new token | 
| user.changename | token, currentname, newname       |  returns new name | changes user's name | 
|user.changepassword|token, currentpassword, newpassword| returns new token | changes user's password|
|user.block|token, username| - |block user with given username|
|messages.getlastmessages|token| json of messages |returns one message from every dialog|
|messages.deletehistory|token, username| - | deletes messages with user with give username|
|messages.markasread|token, username| - | marks all messages with user as read |
|messages.getunread|token, username|json of messages| returns all unread messages from user with given username|
|messages.get|token, username, from, to|json of messages| returns messages from given number to given number|
|messages.send|token, username, content| - |sends message to username|
|user.getname|username|string|returns name of user with given username|
|user.getblocked|token|json of usernames|returns blocked users|
|user.getdialogues|token|json of usernames|returns user with messages with you|
|user.validatetoken|token|true \|\| false|returns if token exists|
|user.getfullinfo|token|json of user parameters| returns all user parameters except password|