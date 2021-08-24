import * as io  from 'socket.io-client' 
const ENDPOINT = "http://localhost:4000";

class SocketHelper  
{
    // when work with constructor make  sure that constructor load one time at one  time
    // after the  comp. load
    // render doesnt work to initalizate the variable again  and again 
    constructor()
    {
        this.socket= io.connect(ENDPOINT);
    }

    getSocket()
    {
 
        return this.socket;
    }
} 
export default new SocketHelper();


 
// import openSocket from 'socket.io-client';

// const socket = openSocket("http://localhost:6600");

// export default socket;

