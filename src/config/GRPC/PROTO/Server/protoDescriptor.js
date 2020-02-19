var protoLoader = require("@grpc/proto-loader")
var grpc = require("grpc")

//list of services
var service = __dirname + "/Service/authenticator.proto"

//loading services
var packageDefinition = protoLoader.loadSync(service, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
})

//loading proto descriptor
var protoDescriptor = grpc.loadPackageDefinition(packageDefinition)

module.exports = protoDescriptor;