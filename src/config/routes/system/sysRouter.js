module.exports = ({ dependencies }) => {
    let router = dependencies.router()
    let SysController = new dependencies.Interpreters.Controller.System({ dependencies })

    router.post("/credentials", SysController.create_credentials())
    router.post("/token", SysController.generate_accessToken())

    //get
    router.get("/get/post-types", SysController.get_post_types())

    return router
}