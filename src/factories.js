const uuidv4 = require("uuid/v4");

//create user
const createUser = ({name = ""} = {}) => ({
    id: uuidv4(),
    name
});

//create message
const createMessage = ({message = "", sender = ""} = {}) =>({
    id: uuidv4(),
    time: getTime(new Date(Date.now())),
    message,
    sender
});

//creat chat
const createChat = ({messages = [], name = "Community", users = []} = {}) => ({
    id: uuidv4(),
    name,
    messages,
    users,
    typingUsers: []
});

//get formatted time like "10:20" or "22:02"
const getTime = (date) => `${date.getHours()}:${"0" + date.getMinutes().slice(-2)}`;

module.exports = {
                    createUser,
                    createMessage,
                    createUser
                 }