// Servidor de Express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');
const cors     = require('cors');

const Sockets  = require('./sockets');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        // connect to db
        dbConnection();
        
        // Http server
        this.server = http.createServer( this.app );
        
        // Configuraciones de sockets
        this.io = socketio( this.server, { /* configuraciones */ } );
    }

    middlewares() {
        // Desplegar el directorio público
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
        
        // TODO: CORS
        this.app.use(cors());

        //Body parser
        this.app.use(express.json());

        // Api ENDpoints
        this.app.use('/api/login',require('../router/auth'));
        this.app.use('/api/messages',require('../router/messages'));
        this.app.use('/api/devices',require('../router/devices'));
    
    }

    // Esta configuración se puede tener aquí o como propieda de clase
    // depende mucho de lo que necesites
    configureSockets() {
        new Sockets( this.io );
    }

    execute() {

        // Inicializar Middlewares
        this.middlewares();

        // Inicializar sockets
        this.configureSockets();

        // Inicializar Server
        this.server.listen( this.port, () => {
            console.log('Server running in port:', this.port );
        });
    }

}


module.exports = Server;