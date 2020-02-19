module.exports = ({ dependencies }) => {
    let router = dependencies.router()
    let UserController = new dependencies.Interpreters.Controller.User({ dependencies })

    try {
        router.post("/post", UserController.post_to_marketplace())
        router.post("/search", UserController.search_marketplace())
    }
    catch (erro) {
        console.log(erro)
    }

    return router
}