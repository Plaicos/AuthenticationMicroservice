async function initialize() {
    //Dependency Creation
    var Dependencies = require("./src/config/dependencies/Dependencies")
    var dependencies = await new Dependencies().build()

    //GRPC 
    var { initialize } = require("./src/config/GRPC/GRPC")
    initialize(dependencies)
}

initialize()

