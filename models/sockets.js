const Markers = require("./markers");

class Sockets {

    constructor( io ) {

        this.io = io;

        this.markers = new Markers();
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
         

             /* From Map App*/
             console.log("client online");
             socket.emit('active-markers', this.markers.actives);
             
             socket.on('new-marker', (marker)=> {
                console.log("marker",marker);
                 this.markers.addMarker(marker);
                 socket.broadcast.emit('new-marker',marker);
             })
           
             socket.on('updated-marker',marker => {
                 this.markers.updateMarker(marker);
                 socket.broadcast.emit('updated-marker',marker);
             });
        
        });
    }


}


module.exports = Sockets;