module.exports = {
    port: "0.0.0.0:10000",
    hostname: "Authentication Microservice",
    callback: function (configs) {
        return function () {
            console.log("Athentication Microservice running at port:", configs.port)
        }
    }
}