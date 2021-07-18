const app = require('../app');
const socket = require('socket.io');
const io = socket(app.server);

let data;// this variable will recieve the value whenever an api is hit where it is used fro example it is used in user controller
exports.socketData = (parameter) => {
    data = parameter;
}

io.on('connection', (socket) => {
    console.log('connected to sockets');

    socket.emit('advertisement_created', { advertisementData: data });
    // after the advertisement is created this event will be emitted with the data of the created advertisement 

    socket.emit('adminApproval', () => {
        return {
            adminId: data.adminId,
            isApproved: data.isApproved
        }
    });
    //after admin approves the advertisement this event will be emitted with data including adminId and isAprroved values
})