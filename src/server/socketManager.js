var io = require("./index");
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require("../events");
var { createUser, createMessage, createUser } = require("../factories");

var connectedUsers = {};

module.exports = (socket) => {
    console.log(`Socket [${socket.id}] connected.`);

    //verify user
    socket.on("VERIFY_USER", (nickname, callback) => {
        if(isUser(connectedUsers, nickname)){
            callback({isUser: true, user: null});
        }
        else {
            callback({isUser: false, user: createUser({name: nickname})})
        }
    });

    //when user is connected
    socket.on(USER_CONNECTED, (user) => {
        //add user to connectedUsers list
        connectedUsers =  addUser(connectedUsers, user);
        //attach this user to the socket
        socket.user = user;
        //broadcast updated user list to all users
        io.sockets.emit(USER_CONNECTED, connectedUsers);
        
        console.log("**************")
        console.log(connectedUsers);
        console.log("**************")
    })
}

//adds new user to the user list
var addUser = (userList, user) => {
    var newList = Object.assign({}, userList);
    newList[user.name] = user;
    return newList;
}

//removes user from the user list
var removeUser = (userList, user) => {
    var newList = Object.assign({}, userList);
    delete newList[user.name];
    return newList;
}

//verifies is user exists in list
var isUser = (userList, user) => (user in userList);