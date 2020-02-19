async function initialize() {
    //Dependency Creation
    var Dependencies = require("./src/config/dependencies/Dependencies")
    var dependencies = await new Dependencies().build()

    //GRPC 
    var { grpcInit } = require("./src/config/GRPC/GRPC")
    grpcInit(dependencies)
}

initialize()

