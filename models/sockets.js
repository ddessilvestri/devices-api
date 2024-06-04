

class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( socket ) => {

            // TODO : Validate JWT --> if the JWT is not valid go offline
            // TODO : Know which user is active using the UID
            // TODO: Emit all the connected user
            // TODO: Scoket join
            // TODO: Listen when a client sends a client : personal-message
            // TODO: Disconnect --> check in the database that the user is offline
         
          
        
        });
    }


}


module.exports = Sockets;