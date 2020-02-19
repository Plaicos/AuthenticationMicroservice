//GRPC and services config
var grpc = require("grpc")
var Authenticator = require("./PROTO/Server/protoDescriptor").Authenticator
var credentials = require("./Credentials/GRPC_Server_Credentials")

//server configs
var server_config = require("../server/server_config")

//creating server instance
var server = new grpc.Server()

function grpcInit(dependencies) {
    //importing Controller constructor
    var Controller = new (require("../../app/Controller/Controller"))(dependencies)
    //
    server.addService(Authenticator.service, {
        createCredential: Controller.create_credential(),
        generateToken: Controller.generateToken(),
        authenticate: Controller.authenticate(),
        checkCredentialClearance: Controller.checkCredentialClearance()
    })
    server.bind(server_config.port, credentials)
    server.start()
    console.log(`Authenticator GRPC Server running on port ${server_config.port}`)
}

module.exports = {
    grpcInit
}