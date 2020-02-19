var grpc = require("grpc")
var credentials = grpc.ServerCredentials.createInsecure()

module.exports = credentials;