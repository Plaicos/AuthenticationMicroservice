module.exports = ({ dependencies, router }) => {
    var Controller = new(require("../../app/Controller/Controller"))(dependencies)
    router = router()
    router.post("/credential", Controller.create_credential())
    router.post("/token", Controller.generateToken())
    router.post("/auth", Controller.authenticate())
    
    return router
}